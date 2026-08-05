"""
Preview-environment edge proxy.

The HOMEWORK platform is a single Next.js 15 application (see /app/frontend) that owns
its own Route Handlers under `/api/*`. The preview ingress, however, routes every
`/api/*` request to this FastAPI process on port 8001 instead of to Next.js on port 3000.

To keep the application source 100% Vercel-correct (Route Handlers stay at
`app/api/...`), this process acts as a transparent reverse proxy that forwards all
`/api/*` traffic to the Next.js server. It contains no business logic whatsoever.

On Vercel this file is not deployed and Next.js serves `/api/*` directly.
"""

from __future__ import annotations

import os

import httpx
from fastapi import FastAPI, Request, Response
from starlette.background import BackgroundTask

NEXT_ORIGIN = os.environ.get("NEXT_ORIGIN", "http://127.0.0.1:3000")

HOP_BY_HOP_HEADERS = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "content-length",
    "content-encoding",
    "host",
}

app = FastAPI(title="HOMEWORK preview edge proxy", docs_url=None, redoc_url=None)
client = httpx.AsyncClient(base_url=NEXT_ORIGIN, timeout=httpx.Timeout(60.0), follow_redirects=False)


def _filter_headers(headers: dict[str, str]) -> dict[str, str]:
    return {k: v for k, v in headers.items() if k.lower() not in HOP_BY_HOP_HEADERS}


@app.api_route(
    "/api/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
)
async def proxy_to_next(path: str, request: Request) -> Response:
    url = f"/api/{path}"
    body = await request.body()

    upstream_request = client.build_request(
        method=request.method,
        url=url,
        params=dict(request.query_params),
        headers=_filter_headers(dict(request.headers)),
        content=body or None,
    )

    try:
        upstream_response = await client.send(upstream_request, stream=True)
    except httpx.HTTPError as exc:
        return Response(
            content=f'{{"error":"upstream_unavailable","detail":"{exc.__class__.__name__}"}}',
            status_code=502,
            media_type="application/json",
        )

    content = await upstream_response.aread()

    return Response(
        content=content,
        status_code=upstream_response.status_code,
        headers=_filter_headers(dict(upstream_response.headers)),
        background=BackgroundTask(upstream_response.aclose),
    )


@app.on_event("shutdown")
async def _shutdown() -> None:
    await client.aclose()
