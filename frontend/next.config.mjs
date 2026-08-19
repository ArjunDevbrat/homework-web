/**
 * Allowed Server Action origins.
 *
 * The preview environment terminates TLS on one hostname and forwards to the app with a
 * different `x-forwarded-host`, which trips Next.js' Server Action origin check. The
 * hostnames are read from the environment so production (Vercel) needs no special casing.
 */
const serverActionOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.ADDITIONAL_ALLOWED_ORIGINS,
]
  .filter((value) => typeof value === 'string' && value.length > 0)
  .flatMap((value) => value.split(','))
  .map((value) => value.trim().replace(/^https?:\/\//, '').replace(/\/$/, ''))
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: serverActionOrigins,
      bodySizeLimit: '2mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'utfs.io' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
