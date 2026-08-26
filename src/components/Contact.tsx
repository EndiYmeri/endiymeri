import { useState, type FormEvent } from 'react';
import GlowButton from './GlowButton';

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-ink-elevated/80 px-4 py-3 text-base text-bone placeholder:text-steel outline-none transition-colors focus:border-steel-bright';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [error, setError] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    void fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, company }),
    })
      .then((response) =>
        response.json().then((data: { ok?: boolean; error?: string }) => ({
          response,
          data,
        }))
      )
      .then(({ response, data }) => {
        if (!response.ok) {
          setStatus('error');
          setError(data.error ?? 'Could not send the message.');
          return;
        }
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(() => {
        setStatus('error');
        setError('Could not send the message. Please email me directly.');
      });
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#14161b_0%,#0c0d10_45%,#1c1f26_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-2xl -translate-x-1/2 rounded-full bg-steel/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
        <p className="font-display text-xs tracking-[0.3em] text-steel uppercase">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="mt-4 font-display text-4xl leading-tight font-semibold tracking-[-0.03em] text-bone md:text-5xl"
        >
          Let’s build something solid
        </h2>
        <p className="mt-5 max-w-xl text-base text-bone-muted md:text-lg">
          Have a product in mind, or need a partner across design and engineering?
          I’d love to hear from you.
        </p>

        <form
          className="relative mt-10 w-full max-w-xl space-y-4 text-left"
          onSubmit={onSubmit}
          noValidate
        >
          <div
            className="absolute left-[-9999px] h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="Your name"
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={120}
              placeholder="Your email"
              className={fieldClass}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={4000}
              placeholder="What are you working on?"
              className={`${fieldClass} resize-y min-h-32`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-3 pt-2">
            <GlowButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </GlowButton>
            {status === 'sent' ? (
              <p className="text-sm text-steel-bright" role="status">
                Sent — I’ll get back to you soon.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm text-bone-muted" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        </form>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="mailto:contact@endiymeri.com">Email me</GlowButton>
          <GlowButton
            href="https://www.upwork.com/freelancers/~012e65813d03982944"
            variant="ghost"
            external
          >
            Upwork
          </GlowButton>
          <GlowButton
            href="https://contra.com/endi_ymeri_g74bx2cy"
            variant="ghost"
            external
          >
            Contra
          </GlowButton>
          <GlowButton
            href="https://www.malt.com/profile/endiymeri"
            variant="ghost"
            external
          >
            Malt
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
