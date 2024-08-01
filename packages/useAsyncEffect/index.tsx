import { useEffect } from 'react';
import { isGeneratorFunction } from '../utils/testingHelpers';
function useAsyncEffect(effect: (isCanceled: () => boolean) => AsyncGenerator<void, void, void> | Promise<void>, deps?: any[]) {
    useEffect(() => {
      let canceled = false;
      if (isGeneratorFunction(effect)) {
        
        (async() => {
          const e = effect(() => canceled) as AsyncGenerator<void, void, void>
          while (true) {
            const result = await e.next();
            console.log({canceled})
            if (result.done || canceled) {
              break;
            }
          }
        })()
        
      } else {
        effect(() => canceled)
      }
      
    
      return () => {
        canceled = true;
      }
    }, deps)
}

export default useAsyncEffect;