// 1. 实现一个计数器组件
// 题目： 实现一个简单的 React 计数器组件。该组件应包含以下功能：
// 显示当前计数
// 按钮可以增加、减少计数
// 按钮可以重置计数

import { useCallback, useState } from "react";

// 有哪些优化方法呢???

export default function Counter() {
  const [count, setCount] = useState(0);
  // 这里会不会每渲染一次 都反复定义一次const呢
  // 会的 只不过定义没啥开销，返回的都是同一个引用

  const add = useCallback(() => {
    // 有问题 这里读取的count从创建时的闭包产生，此处的count指向的是定义时的count变量，而非后面更新的count变量，他们只是同名
    // 简单来说 此处的count指向的一直是首次渲染时 根据词法作用域向外寻找的那个闭包count，而非该次渲染中已经更新的count【同名而已】
    // setCount(count + 1);
    setCount((pre) => pre + 1);
  }, []);

  // 改进方式1 deps加count 每次加count时都会重新返回一个函数
  // 疑问 什么叫做返回函数 返回的是一个函数字符串片段还是 为什么外部变量会影响函数的执行？
  // useCallback返回的是一个函数实例，一个函数是一个对象，即：返回了一个内存地址
  // 该函数实例包含它的代码，和它的上下文环境（闭包啊外部变量等等）
  // 因此 下面的例子 返回的函数实例中指向的count一直是当时的闭包，但是当deps加上count后
  // 每次count 都会返回一个新的函数实例 该函数实例的词法环境又不一样了，即：count指向更新后的count
  // const add = useCallback(() => setCount(count + 1), [count]);

  const sub = useCallback(() => setCount((count) => count - 1), []);

  const reset = useCallback(() => setCount(0), []);

  return (
    <>
      <button onClick={add}>+1</button>
      <button onClick={sub}>-1</button>
      <button onClick={reset}>reset</button>
      <h1>当前值为{count}</h1>
    </>
  );
}
