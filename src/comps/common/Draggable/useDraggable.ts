// 作用: 让一个对象变得可拖动的，把一系列的drag值全都设置在该对象身上

import { useCallback, useMemo } from "react";

// hoc是什么?
// 接受一个入参 是一个函数组件 在外面给他套一点逻辑 再返回一个组件
// 所以hoc实际上返回的是一个组件 那再useDraggable的基础上还需要另外再创建一个组件？
// hoc是继承的关系吗？感觉算 在todo组件外增加一些特性
// 不是继承的关系 无法实现类组件继承（继承不了静态属性 除非手动继承 容易漏）
// usexxx 只要父组件重新渲染了 usexxx就会被重新调用 那这里有优化空间吗

// 其实可以进一步优化 传一个obj 包含：data：想要传输的数据 回调函数

interface dragParams {
  data: { [key: string]: any };
  [key: string]: any;
}
export default function useDraggable(params: dragParams) {
  // 待办  应该怎么增加回调呢
  const handleDragStart = useCallback(function (e: DragEvent) {
    // 设置所有需要通信的数据
    const { data } = params;
    for (let k in data) {
      e.dataTransfer?.setData(k, data[k]);
    }
    // e.dataTransfer?.setData("dragId", params.data?);
    // dragStartCb()
    // ??? 此处的依赖不知道该怎么设置 这里的e 会缓存吗 他是一个纯函数感觉没有依赖到外部属性
    // 感觉是可以被缓存的
  }, []);

  // const handleDragOver = useCallback(function (e: DragEvent) {}, [dragId]);

  // function handleDragEnd(e: DragEvent) {}

  const draggableProps = useMemo(
    () => ({
      draggable: true,
      onDragStart: (e: DragEvent) => handleDragStart(e),
      // onDragEnd: (e: DragEvent) => handleDragEnd(e),
      // onDragOver: (e: DragEvent) => handleDragOver(e),
    }),
    []
  );
  return draggableProps;
}
