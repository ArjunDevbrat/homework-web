import { siteConfig } from '@/lib/data';

type EmailPayload = {
  readonly subject: string;
  readonly heading: string;
  readonly rows: readonly { label: string; value: string }[];
};

type DeliveryResult = {
  readonly delivered: boolean;
  readonly reason?: string;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHtml(payload: EmailPayload): string {
  const rows = payload.rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 0;color:#5A6B7B;font-size:13px;width:150px">${escapeHtml(
          row.label,
        )}</td><td style="padding:8px 0;color:#1F2D3D;font-size:14px">${escapeHtml(row.value)}</td></tr>`,
    )
    .join('');

  return `<div style="background:#F8FCFD;padding:32px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E6F2F5;border-radius:16px;padding:28px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8496A6">${escapeHtml(
      siteConfig.name,
    )}</p>
    <h1 style="margin:0 0 20px;font-size:20px;color:#1F2D3D">${escapeHtml(payload.heading)}</h1>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
  </div>
</div>`;
}

/**
 * Transactional email transport. Fully env-gated: when RESEND_API_KEY is absent the
 * submission still succeeds and the notification is skipped, so the product works
 * before credentials are provisioned.
 */
export async function sendNotificationEmail(payload: EmailPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;

  if (!apiKey || !from) {
    return { delivered: false, reason: 'email_transport_not_configured' };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: payload.subject,
        html: renderHtml(payload),
      }),
    });

    if (!response.ok) {
      return { delivered: false, reason: `resend_error_${response.status}` };
    }

    return { delivered: true };
  } catch {
    return { delivered: false, reason: 'resend_request_failed' };
  }
}

type ConfirmationInput = {
  readonly to: string;
  readonly name: string;
};

function renderConfirmationHtml(name: string): string {
  const firstName = escapeHtml(name.split(' ')[0] || name);
  return `<div style="background:#F8FCFD;padding:32px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E6F2F5;border-radius:16px;padding:28px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8496A6">${escapeHtml(
      siteConfig.name,
    )}</p>
    <h1 style="margin:0 0 16px;font-size:20px;color:#1F2D3D">Thanks, ${firstName} — request received</h1>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#5A6B7B">Coach Samrat reviews every consultation request personally and will reach out within 48 hours to schedule your free 20-minute call.</p>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#5A6B7B">There is nothing you need to do in the meantime. If anything is urgent, simply reply to this email.</p>
    <p style="margin:20px 0 0;font-size:13px;color:#8496A6">— Team ${escapeHtml(siteConfig.name)}</p>
  </div>
</div>`;
}

/**
 * User-facing confirmation email. Fully env-gated: when RESEND credentials are absent
 * the consultation still succeeds and this simply no-ops.
 *
 * Note: in Resend test mode (no verified domain) delivery is limited to the account
 * owner's own address until a sending domain is verified.
 */
export async function sendConfirmationEmail({ to, name }: ConfirmationInput): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return { delivered: false, reason: 'email_transport_not_configured' };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `We received your consultation request — ${siteConfig.name}`,
        html: renderConfirmationHtml(name),
      }),
    });

    if (!response.ok) {
      return { delivered: false, reason: `resend_error_${response.status}` };
    }

    return { delivered: true };
  } catch {
    return { delivered: false, reason: 'resend_request_failed' };
  }
}
