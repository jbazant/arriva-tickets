import { useCallback, useEffect, useRef } from 'react';

export function useMountedFlag() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return useCallback(() => isMounted.current, []);
}
