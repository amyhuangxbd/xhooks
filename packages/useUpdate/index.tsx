import react, { useState, useCallback } from 'react';

function useUpdate() {
    const [, setState] = useState(0)
    return useCallback(
      () => {
        setState(prev => prev + 1 % 2)
      },
      [],
    )
    
}

export default useUpdate;