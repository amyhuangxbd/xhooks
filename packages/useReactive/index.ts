import { useState, useEffect, useRef } from 'react';

// 深度代理函数，用于递归处理对象和数组的属性
function deepProxy(target, handler) {
  if (typeof target === 'object' && target !== null) {
    for (let key in target) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        target[key] = deepProxy(target[key], handler);
      }
    }
    return new Proxy(target, handler);
  }
  return target;
}

function useReactive(initialState) {
  const [, setState] = useState();
  const stateRef = useRef(initialState);

  const handler = {
    get(target, key, receiver) {
      try {
        return new Proxy(target[key], handler);
      } catch (e) {
        return Reflect.get(target, key, receiver);
      }
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      setState({});
      return result;
    }
  };

  useEffect(() => {
    stateRef.current = deepProxy(stateRef.current, handler);
  }, []);

  return stateRef.current;
}

export default useReactive;
