import React from 'react';
import useReactive from './index';

function App() {
  const state = useReactive({
    message: 'Hello, useReactive!',
    nested: {
      count: 0
    }
  });

  return (
    <div>
      <input
        type="text"
        value={state.message}
        onChange={(e) => (state.message = e.target.value)}
      />
      <p>{state.message}</p>
      <button onClick={() => (state.nested.count += 1)}>Increment</button>
      <p>Count: {state.nested.count}</p>
    </div>
  );
}

export default App;
