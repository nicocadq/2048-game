import { useCallback, useRef } from 'react';

export const useDebouncedCallback = (callback, delay) => {
  const debounce = useRef(null);
  return useCallback(
    (...args) => {
      const context = this;
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    },
    [callback, delay]
  );
};
