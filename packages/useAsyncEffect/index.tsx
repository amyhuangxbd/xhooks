import { useEffect } from 'react';
function useAsyncEffect(effect: () => Promise<void>, deps?: any[]) {
    
    useEffect(() => {
      let isActive = true;
      (async () => {
        if (isActive) {
            await effect()
        }
      })();
    
      return () => {
        isActive = false
      }
    }, deps)
}

export default useAsyncEffect;