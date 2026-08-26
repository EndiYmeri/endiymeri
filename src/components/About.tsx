import SoftAurora from './SoftAurora';

const technologies = [
  'TypeScript',
  'React',
  'Astro',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'GraphQL',
  'Cloudflare',
];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden border-t border-line pt-16 pb-24 md:pt-24 md:pb-32"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 opacity-55">
        <SoftAurora
          speed={0.45}
          scale={1.15}
          brightness={0.55}
          color1="#3a3f48"
          color2="#8a9199"
          bandHeight={0.35}
          bandSpread={1.4}
          enableMouseInteraction={false}
          mouseInfluence={0.2}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-ink/55" />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10">
        <div>
          <p className="font-display text-xs tracking-[0.3em] text-steel uppercase">
            About me
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-[-0.03em] text-bone md:text-5xl"
          >
            Full Stack Developer
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-bone-muted md:text-lg">
            I work across the stack — from interfaces that feel intentional to
            APIs and infrastructure that stay out of the way. Simple systems,
            sharp details, and products people enjoy using.
          </p>
        </div>

        <div>
          <p className="font-display text-xs tracking-[0.3em] text-steel uppercase">
            Technologies
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-ink-elevated/70 px-4 py-2 text-sm text-steel-bright backdrop-blur-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
