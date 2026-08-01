import type { ReactNode } from 'react';

interface IosWindowProps {
  children: ReactNode;
  className?: string;
}

/** Compact iPhone-style window chrome for folder previews. */
export default function IosWindow({ children, className = '' }: IosWindowProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] ${className}`}
      style={{ borderRadius: '18%' }}
    >
      {/* Outer bezel */}
      <div
        className="absolute inset-[3%] overflow-hidden bg-[#0a0a0a]"
        style={{ borderRadius: '15%' }}
      >
        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden">{children}</div>

        {/* Status bar / Dynamic Island */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18%] bg-linear-to-b from-black/45 to-transparent">
          <div className="absolute top-[22%] left-1/2 h-[38%] w-[34%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
          <div className="absolute top-[34%] left-[10%] h-[10%] w-[12%] rounded-full bg-white/70" />
          <div className="absolute top-[34%] right-[10%] flex h-[10%] items-center gap-[8%]">
            <span className="block h-full w-[18%] rounded-sm bg-white/70" />
            <span className="block h-full w-[18%] rounded-sm bg-white/70" />
            <span className="block h-full w-[28%] rounded-sm bg-white/70" />
          </div>
        </div>

        {/* Home indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[12%] bg-linear-to-t from-black/35 to-transparent">
          <div className="absolute bottom-[28%] left-1/2 h-[14%] w-[32%] -translate-x-1/2 rounded-full bg-white/75" />
        </div>
      </div>
    </div>
  );
}
