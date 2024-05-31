import { useLayoutEffect, useRef } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
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
  }, [ref]);

  return dimensions.current;
};

export default useDimensions;
