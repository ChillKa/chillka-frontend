import { useLayoutEffect, useRef } from 'react';

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

  const measure = () => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  };

  useLayoutEffect(() => {
    measure(); // Measure initially

    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [ref.current]);

  return dimensions.current;
};

export default useDimensions;
