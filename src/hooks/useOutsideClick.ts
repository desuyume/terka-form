import { RefObject, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);
};

export default useOutsideClick;
