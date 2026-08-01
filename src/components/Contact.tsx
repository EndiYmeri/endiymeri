import GlowButton from './GlowButton';

export default function Contact() {
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="mailto:hello@endiymeri.com">Email me</GlowButton>
          <GlowButton
            href="https://github.com"
            variant="ghost"
            external
          >
            GitHub
          </GlowButton>
          <GlowButton
            href="https://linkedin.com"
            variant="ghost"
            external
          >
            LinkedIn
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
