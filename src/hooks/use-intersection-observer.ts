import { RefObject, useEffect, useRef } from 'react';

type IntersectionObserverHook = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) => RefObject<HTMLDivElement>;

const useIntersectionObserver: IntersectionObserverHook = (
  callback,
  options
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!(entry.isIntersecting && !hasTriggered.current)) {
          return;
        }

        callback(entries, obs);
        hasTriggered.current = true;
        obs.unobserve(entry.target);
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback, options]);

  return ref;
};

export default useIntersectionObserver;
