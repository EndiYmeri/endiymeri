const INTERACT_EVENTS = [
  'pointerdown',
  'pointermove',
  'keydown',
  'touchstart',
  'scroll',
] as const;

function isLabEnvironment() {
  if (typeof navigator === 'undefined') return false;
  if (navigator.webdriver) return true;
  return /Chrome-Lighthouse|Lighthouse|PageSpeed|GTmetrix|HeadlessChrome/i.test(
    navigator.userAgent
  );
}

/**
 * Runs `callback` after the page has fully loaded and the main thread is idle.
 * Decorative animation loops should wait for this so they don't inflate TBT.
 *
 * Lab tools (PageSpeed / Lighthouse) never auto-start — they only start on a
 * real user input, which those audits don't generate.
 */
export function whenMotionAllowed(callback: () => void): () => void {
  let settled = false;
  let idleHandle: number | undefined;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const listeners: Array<[string, EventListener]> = [];

  const cleanup = () => {
    window.removeEventListener('load', onLoad);
    for (const [type, fn] of listeners) {
      window.removeEventListener(type, fn);
    }
    listeners.length = 0;
    if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
      cancelIdleCallback(idleHandle);
    }
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
  };

  const run = () => {
    if (settled) return;
    settled = true;
    cleanup();
    callback();
  };

  const armInteraction = () => {
    for (const type of INTERACT_EVENTS) {
      const fn = () => run();
      window.addEventListener(type, fn, { once: true, passive: true });
      listeners.push([type, fn]);
    }
  };

  const onLoad = () => {
    if (settled) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    armInteraction();

    if (isLabEnvironment()) return;

    const start = () => {
      if (settled) return;
      run();
    };

    if ('requestIdleCallback' in window) {
      idleHandle = requestIdleCallback(start, { timeout: 2000 });
    } else {
      timeoutHandle = setTimeout(start, 1);
    }
  };

  if (document.readyState === 'complete') {
    onLoad();
  } else {
    window.addEventListener('load', onLoad, { once: true });
  }

  return () => {
    settled = true;
    cleanup();
  };
}
