/**
 *  基础用法
 *  组件加载时进行异步的检查
 */

// import { useAsyncEffect } from 'xhooks';
import useAsyncEffect from '../index'
import React, { useState } from 'react';

function sleep(time: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export default () => {
    const [x, setX] = useState(1);
    const [y, setY] = useState(0);
    useAsyncEffect(
    async (isCanceled) => {
        await sleep(100);
        if (!isCanceled()) {
            setY(x);
        }
        
    },
    [x],
    );
    useAsyncEffect(async (isCanceled) => {
        await sleep(20);
        if (!isCanceled()) {
            setX(3);
        }
    }, [])

  return (
    <div>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
