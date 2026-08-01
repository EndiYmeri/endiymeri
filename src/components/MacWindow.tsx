import type { ReactNode } from 'react';

interface MacWindowProps {
  children: ReactNode;
  title?: string;
}

/** Compact macOS window chrome for folder previews. */
export default function MacWindow({
  children,
  title = 'Safari',
}: MacWindowProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[10%] bg-[#1c1c1e] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
      {/* Title bar */}
      <div className="relative z-10 flex h-[18%] shrink-0 items-center gap-[6%] bg-[#2a2a2c] px-[6%]">
        <div className="flex items-center gap-[18%]">
          <span className="block h-[55%] w-[55%] min-h-[4px] min-w-[4px] rounded-full bg-[#ff5f57]" />
          <span className="block h-[55%] w-[55%] min-h-[4px] min-w-[4px] rounded-full bg-[#febc2e]" />
          <span className="block h-[55%] w-[55%] min-h-[4px] min-w-[4px] rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute inset-x-[22%] top-1/2 flex h-[48%] -translate-y-1/2 items-center justify-center rounded-full bg-black/35 px-1">
          <span className="truncate text-[5px] leading-none text-white/55 sm:text-[6px]">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
        {children}
      </div>
    </div>
  );
}
