'use client';

import { useLayoutEffect, useState } from 'react';

// Restrict value to be between the range [0, value]
const clamp = (value: number) => Math.max(0, value);

// Check if number is between two values
const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

const useScrollspy = (ids: string[], offset: number = 0) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .reduce(
          (prev, curr) => {
            if (isBetween(scroll, curr.top, curr.bottom)) {
              return curr;
            }
            if (curr.top < scroll && curr.bottom > scroll) {
              return curr;
            }
            // Compare which section is closer to the current scroll position
            if (prev.id === '') return curr;
            const prevDistance = Math.abs(
              scroll - (prev.top + prev.bottom) / 2
            );
            const currDistance = Math.abs(
              scroll - (curr.top + curr.bottom) / 2
            );
            return currDistance < prevDistance ? curr : prev;
          },
          { id: '', top: -1, bottom: -1 }
        );

      setActiveId(position?.id || ids[0]);
    };

    listener();

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, offset]);

  return activeId;
};

export default useScrollspy;
