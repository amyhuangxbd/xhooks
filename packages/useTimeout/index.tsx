import react, { useEffect, useCallback, useRef } from 'react';

function useTimeout(callback, delay) {
    const callbackRef = useRef()
    const timer = useRef()
    
    useEffect(() => {
      callbackRef.current = callback;
    }, [callback])

    const clear = useCallback(
      () => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
      },
      [delay],
    )
    
    
    useEffect(() => {
      if (typeof delay !== 'number' || delay < 0) {
        return;
      }
      timer.current = setTimeout(() => {
        if (callbackRef.current) {
            callbackRef.current();
        }
      }, delay);
    
      return () => {
        clear();
      }
    }, [delay])
    return clear;
}

export default useTimeout;