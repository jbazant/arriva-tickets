import { useCallback, useRef } from 'react';

export function useMountedFlag() {
  const isMounted = useRef(true);
  return useCallback(() => isMounted.current, []);
}
