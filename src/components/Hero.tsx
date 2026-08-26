import DotField from './DotField';
import GlowButton from './GlowButton';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[80svh] items-center overflow-hidden md:min-h-[80svh]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-ink">
        <DotField
          className="h-full w-full"
          dotRadius={1.35}
          dotSpacing={18}
          bulgeStrength={58}
          glowRadius={180}
          waveAmplitude={0.85}
          gradientFrom="rgba(197, 202, 209, 0.28)"
          gradientTo="rgba(138, 145, 153, 0.18)"
          glowColor="#1c1f26"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,13,16,0.35)_55%,rgba(12,13,16,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20">
        <p className="animate-fade font-display text-xs tracking-[0.35em] text-steel uppercase">
          Portfolio
        </p>

        <h1 className="animate-rise delay-1 mt-5 max-w-4xl font-display text-[clamp(3.4rem,12vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-bone">
          Endi Ymeri
        </h1>

        <p className="animate-rise delay-2 mt-6 max-w-xl text-lg text-bone-muted md:text-xl">
          Welcome — I design and build full-stack products with clarity, craft,
          and quiet motion.
        </p>

        <div className="animate-rise delay-3 mt-10 flex flex-wrap items-center gap-4">
          <GlowButton href="#projects">View projects</GlowButton>
          <GlowButton href="#contact" variant="ghost">
            Get in touch
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
