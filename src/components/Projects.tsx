import { useEffect, useRef, useState, type ReactNode } from 'react';
import Folder from './Folder';
import IosWindow from './IosWindow';
import MacWindow from './MacWindow';

type ProjectMedia = {
  type: 'image' | 'video';
  src: string;
};

type Project = {
  title: string;
  note: string;
  href: string;
  color: string;
  windowShape: 'phone' | 'laptop';
  windowTitle?: string;
  media: ProjectMedia[];
};

const projects: Project[] = [
  {
    title: 'Celular.al',
    note: 'E-commerce for phones & tech',
    href: 'https://www.celular.al/',
    color: '#4a4f55',
    windowShape: 'laptop',
    windowTitle: 'celular.al',
    media: [
      { type: 'video', src: '/projects/celular/preview-2.webm' },
      { type: 'image', src: '/projects/celular/search-screen.png' },
      { type: 'video', src: '/projects/celular/preview-1.webm' },
    ],
  },
  {
    title: 'BESA Developments',
    note: 'Industrial roofing specialists',
    href: 'https://besadevelopments.co.uk/',
    color: '#3d4248',
    windowShape: 'laptop',
    windowTitle: 'besadevelopments.co.uk',
    media: [
      { type: 'image', src: '/projects/besa/screen1.png' },
      { type: 'image', src: '/projects/besa/screen2.png' },
      { type: 'image', src: '/projects/besa/screen3.png' },
    ],
  },
];

function WindowShell({
  shape,
  title,
  children,
}: {
  shape: 'phone' | 'laptop';
  title?: string;
  children: ReactNode;
}) {
  if (shape === 'laptop') {
    return <MacWindow title={title}>{children}</MacWindow>;
  }
  return <IosWindow>{children}</IosWindow>;
}

function PaperImage({
  src,
  alt,
  shape,
  title,
}: {
  src: string;
  alt: string;
  shape: 'phone' | 'laptop';
  title?: string;
}) {
  return (
    <WindowShell shape={shape} title={title}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        draggable={false}
      />
    </WindowShell>
  );
}

function PaperVideo({
  src,
  active,
  shape,
  title,
}: {
  src: string;
  active: boolean;
  shape: 'phone' | 'laptop';
  title?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const stickToFirstFrame = () => {
      video.pause();
      // Seek to the first frame and hold there after playback ends.
      if (video.currentTime !== 0) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('ended', stickToFirstFrame);

    if (active && !playedRef.current) {
      playedRef.current = true;
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else if (!active) {
      stickToFirstFrame();
      playedRef.current = false;
    }

    return () => {
      video.removeEventListener('ended', stickToFirstFrame);
    };
  }, [active]);

  return (
    <WindowShell shape={shape} title={title}>
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </WindowShell>
  );
}

function ProjectFolder({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [folderSize, setFolderSize] = useState(1.25);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setFolderSize(mq.matches ? 1.45 : 1.2);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <Folder
      color={project.color}
      size={folderSize}
      windowShape={project.windowShape}
      onOpenChange={setOpen}
      items={project.media.map((item, index) =>
        item.type === 'video' ? (
          <PaperVideo
            key={item.src}
            src={item.src}
            active={open}
            shape={project.windowShape}
            title={project.windowTitle}
          />
        ) : (
          <PaperImage
            key={item.src}
            src={item.src}
            alt={`${project.title} preview ${index + 1}`}
            shape={project.windowShape}
            title={project.windowTitle}
          />
        )
      )}
    />
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-x-clip border-t border-line bg-ink py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(138,145,153,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-display text-xs tracking-[0.3em] text-steel uppercase">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-[-0.03em] text-bone md:text-5xl"
          >
            Projects
          </h2>
          <p className="mt-5 text-base text-bone-muted md:text-lg">
            Click a folder to open and preview.
          </p>
        </div>

        <ul className="mt-16 flex flex-col items-center gap-y-10 overflow-x-clip md:flex-row md:flex-wrap md:justify-center md:gap-x-24 md:gap-y-32">
          {projects.map(project => (
            <li
              key={project.title}
              className="flex w-full max-w-md flex-col items-center text-center md:w-80 lg:w-96"
            >
              <div className="relative flex h-72 w-full items-end justify-center overflow-visible px-4 pb-2 pt-28 sm:h-80 sm:pt-32 md:h-[26rem] md:pt-40">
                <ProjectFolder project={project} />
              </div>
              <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-bone">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-steel-bright"
                >
                  {project.title}
                </a>
              </h3>
              <p className="mt-1 text-sm text-steel">{project.note}</p>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs tracking-wide text-bone-muted underline-offset-4 transition-colors hover:text-bone hover:underline"
              >
                Visit site
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
