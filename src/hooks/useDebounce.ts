import { DependencyList, useEffect } from 'react';

const useDebounce = (fn: () => void, delay: number, deps: DependencyList) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      fn();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, deps);
};

export default useDebounce;
