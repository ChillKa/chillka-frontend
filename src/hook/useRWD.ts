import { useEffect, useState } from 'react';

const useRWD = () => {
  const [windowSize, setWindowSize] = useState('mobile');

  const handleRWD = () => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1280) {
      setWindowSize('mobile');
    } else {
      setWindowSize('PC');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    window.addEventListener('resize', handleRWD);
    handleRWD();
    return () => window.removeEventListener('resize', handleRWD);
  }, []);

  return windowSize;
};

export default useRWD;
