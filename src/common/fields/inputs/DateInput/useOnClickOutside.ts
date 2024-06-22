import React from 'react';

export const useOnCLickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: Event) => void, // зачем нужен event
) => {
  React.useEffect(() => {
    const listener = (event: Event) => {
      const element = ref?.current;
      if (!element || element.contains(event.target as Node) || null) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
