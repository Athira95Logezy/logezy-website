import { useEffect, useRef } from 'react';

/**
 * Finds all `.sr`, `.sr-left`, `.sr-right`, `.sr-scale` elements
 * inside the returned ref and reveals them with stagger when the
 * section scrolls into view.
 */
export function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = section.querySelectorAll(
            '.sr, .sr-left, .sr-right, .sr-scale'
          );
          items.forEach((el, i) => {
            const delay = i * 80;
            (el as HTMLElement).style.transitionDelay = `${delay}ms`;
            el.classList.add('in-view');
          });
          observer.unobserve(section);
        }
      },
      { threshold }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [threshold]);

  return ref as React.RefObject<any>;
}
