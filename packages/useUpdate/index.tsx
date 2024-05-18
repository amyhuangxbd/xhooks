import react, { useState, useCallback } from 'react';

function useUpdate() {
    const [, setState] = useState(-1)
    return useCallback(
      () => {
        setState(Math.random())
      },
      [],
    )
    
}

export default useUpdate;