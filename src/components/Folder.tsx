import React, { useState } from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  onOpenChange?: (open: boolean) => void;
  /** Shape of preview papers when the folder is open */
  windowShape?: 'phone' | 'laptop';
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  onOpenChange,
  windowShape = 'phone',
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const handleClick = () => {
    setOpen(prev => {
      const next = !prev;
      if (!next) {
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      }
      onOpenChange?.(next);
      return next;
    });
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (windowShape === 'laptop') {
      if (index === 0) return 'translate(-120%, -78%) rotate(-9deg) scale(1.15)';
      if (index === 1) return 'translate(5%, -78%) rotate(9deg) scale(1.15)';
      if (index === 2) return 'translate(-50%, -105%) rotate(3deg) scale(1.22)';
      return '';
    }
    if (index === 0) return 'translate(-125%, -88%) rotate(-10deg) scale(1.16)';
    if (index === 1) return 'translate(10%, -88%) rotate(10deg) scale(1.16)';
    if (index === 2) return 'translate(-50%, -115%) rotate(3deg) scale(1.22)';
    return '';
  };

  const paperRadius = windowShape === 'laptop' ? '10%' : '18%';

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative cursor-pointer transition-all duration-200 ease-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined,
        }}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div
          className="relative h-[80px] w-[100px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute bottom-[98%] left-0 z-0 h-[10px] w-[30px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          />
          {papers.map((item, i) => {
            let sizeClasses = '';
            if (windowShape === 'laptop') {
              if (i === 0) sizeClasses = open ? 'w-[96%] h-[74%]' : 'w-[70%] h-[80%]';
              if (i === 1) sizeClasses = open ? 'w-[96%] h-[74%]' : 'w-[80%] h-[70%]';
              if (i === 2) sizeClasses = open ? 'w-[102%] h-[78%]' : 'w-[90%] h-[60%]';
            } else {
              if (i === 0) sizeClasses = open ? 'w-[54%] h-[115%]' : 'w-[70%] h-[80%]';
              if (i === 1) sizeClasses = open ? 'w-[54%] h-[115%]' : 'w-[80%] h-[70%]';
              if (i === 2) sizeClasses = open ? 'w-[58%] h-[120%]' : 'w-[90%] h-[60%]';
            }

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute bottom-[10%] left-1/2 z-20 origin-bottom transition-all duration-300 ease-in-out ${
                  !open
                    ? '-translate-x-1/2 translate-y-[10%] group-hover:translate-y-0 group-hover:scale-110'
                    : 'hover:scale-105'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: '#111111',
                  borderRadius: paperRadius,
                  overflow: 'hidden',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' }),
            }}
          />
          <div
            className={`absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
