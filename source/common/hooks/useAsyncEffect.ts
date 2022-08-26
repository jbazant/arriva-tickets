import { useEffect } from 'react';

// note that callback and disposer are treated as immutable callbacks

export function useAsyncEffect(
  callback: (getMounted: () => boolean) => Promise<void>,
  disposer: (() => void) | undefined,
  dependencies: any[],
) {
  useEffect(() => {
    let isMounted = true;

    (async function () {
      try {
        await callback(() => isMounted);
      } catch (e: any) {
        console.warn(e);
      }
    })();

    return () => {
      disposer?.();
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
