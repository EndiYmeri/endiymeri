import type { APIRoute } from 'astro';
import { Configuration, SendApi, type V1SendRequest } from 'hostinger-mail-api-sdk';

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 4000;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.HOSTINGER_MAIL_API_TOKEN;
  const mailboxId = import.meta.env.HOSTINGER_MAILBOX_RESOURCE_ID;
  const inbox = import.meta.env.CONTACT_INBOX ?? 'contact@endiymeri.com';

  if (!token || !mailboxId) {
    return json(
      { error: 'Email is not configured yet. Please use the links below.' },
      503
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot — bots fill hidden fields; humans never see this.
  if (asString(payload.company)) {
    return json({ ok: true });
  }

  const name = asString(payload.name).slice(0, MAX_NAME);
  const email = asString(payload.email).slice(0, MAX_EMAIL);
  const message = asString(payload.message).slice(0, MAX_MESSAGE);

  if (name.length < 2) {
    return json({ error: 'Please enter your name.' }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: 'Please enter a valid email.' }, 400);
  }
  if (message.length < 10) {
    return json({ error: 'Please write a slightly longer message.' }, 400);
  }

  try {
    const send = new SendApi(
      new Configuration({
        accessToken: token,
      })
    );

    const body: Partial<V1SendRequest> = {
      to: [inbox],
      displayName: name,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    await send.sendEmail(mailboxId, body as V1SendRequest);
    return json({ ok: true });
  } catch (error) {
    console.error('Hostinger mail send failed:', error);
    return json(
      { error: 'Could not send the message. Please email me directly.' },
      502
    );
  }
};
