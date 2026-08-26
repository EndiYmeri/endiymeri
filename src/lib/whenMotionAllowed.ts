const INTERACT_EVENTS = [
  'pointerdown',
  'pointermove',
  'keydown',
  'touchstart',
] as const;

/**
 * Starts decorative animation only after a real user gesture.
 *
 * Do not auto-start on idle/load: PageSpeed and Lighthouse keep the tab
 * open for many seconds, and a 60fps canvas/WebGL loop shows up as tens of
 * seconds of main-thread "Other" work. A static first paint is enough until
 * the pointer moves.
 */
export function whenMotionAllowed(callback: () => void): () => void {
  let settled = false;
  const listeners: Array<[string, EventListener]> = [];

  const cleanup = () => {
    for (const [type, fn] of listeners) {
      window.removeEventListener(type, fn);
    }
    listeners.length = 0;
  };

  const run = () => {
    if (settled) return;
    settled = true;
    cleanup();
    callback();
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {
      settled = true;
    };
  }

  for (const type of INTERACT_EVENTS) {
    const fn = () => run();
    window.addEventListener(type, fn, { once: true, passive: true });
    listeners.push([type, fn]);
  }

  return () => {
    settled = true;
    cleanup();
  };
}
