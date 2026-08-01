import BorderGlow from './BorderGlow';

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  external?: boolean;
}

export default function GlowButton({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
}: GlowButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <BorderGlow
      className={`inline-grid shadow-none! ${className}`}
      backgroundColor={isPrimary ? '#e8e4dc' : '#14161b'}
      borderRadius={999}
      glowColor={isPrimary ? '40 10 82' : '210 6 70'}
      glowIntensity={0.9}
      glowRadius={24}
      edgeSensitivity={18}
      coneSpread={30}
      fillOpacity={0.4}
      animated={false}
      colors={
        isPrimary
          ? ['#d9d4cb', '#f4f1ea', '#b8b3a8']
          : ['#8a9199', '#c5cad1', '#5c636b']
      }
    >
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`inline-flex items-center justify-center px-7 py-3.5 font-display text-sm font-semibold tracking-wide ${
          isPrimary ? 'text-ink' : 'text-bone'
        }`}
      >
        {children}
      </a>
    </BorderGlow>
  );
}
