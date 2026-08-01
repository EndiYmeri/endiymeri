import { useEffect, useState } from 'react';
import GradualBlur from './GradualBlur';

const BOTTOM_THRESHOLD_PX = 48;

function isScrolledToBottom() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return true;
  return window.scrollY >= maxScroll - BOTTOM_THRESHOLD_PX;
}

/** Soft blur at the bottom of the viewport — hidden when the page is scrolled to the end. */
export default function PageScrollBlur() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => setAtBottom(isScrolledToBottom());

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="7rem"
      strength={1.4}
      divCount={6}
      curve="ease-out"
      opacity={0.75}
      zIndex={40}
      animated={false}
      style={{
        opacity: atBottom ? 0 : 1,
        transition: 'opacity 0.25s ease-out',
        pointerEvents: 'none',
      }}
    />
  );
}
