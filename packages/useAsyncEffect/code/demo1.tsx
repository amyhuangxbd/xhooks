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
  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(await sleep(2000));
  }, []);

  return (
    <div>
      {
        loading ? '已加载' : '加载中'
      }
    </div>
  );
};
