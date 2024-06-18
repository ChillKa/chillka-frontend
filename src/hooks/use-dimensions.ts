import { useCallback, useLayoutEffect, useRef } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

/**
 * useDimensions
 *
 * A custom React hook that measure the status of components height and width, and updates the returns when windows resizes.
 *
 */
const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const dimensions = useRef<Dimensions>({ width: 0, height: 0 });

  const measure = useCallback(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  useLayoutEffect(() => {
    measure(); // Measure initially

    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  return dimensions.current;
};

export default useDimensions;
