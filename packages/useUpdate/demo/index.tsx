import React from 'react';
import useUpdate from '../index';

function ExampleComponent() {
  const forceUpdate = useUpdate();

  return (
    <div>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <button onClick={forceUpdate}>Force Update</button>
    </div>
  );
}

export default ExampleComponent;