import { useEffect, useRef } from 'react';

const useCloseOnClick = (
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
) => {
  const targetRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (targetRef.current && targetRef.current.contains(event.target as Node))
        setIsOpen(!isOpen);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, setIsOpen]);

  return targetRef;
};

export default useCloseOnClick;
