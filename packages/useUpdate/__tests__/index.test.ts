import { renderHook, act } from '@testing-library/react';
import useUpdate from '..';

describe('useUpdate', () => {
  it('should return same update function', () => {
    const hooks = renderHook(() => useUpdate());
    const preUpdate = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(preUpdate);
  });
});
