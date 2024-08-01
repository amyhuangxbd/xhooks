---
nav:
  path: /hooks
---

# useAsyncEffect

useEffect 支持async...await...

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 中断执行

<code src="./demo/demo2.tsx" />

### 中断执行

<code src="./demo/demo3.tsx" />

## API

```typescript
function useAsyncEffect(
  effect: (isCancelled: () => boolean) => AsyncGenerator | Promise,
  deps: DependencyList
);
```