// 作用: 让一个对象变得可拖动的，把一系列的drag值全都设置在该对象身上

// hoc是什么?
// 接受一个入参 是一个函数组件 在外面给他套一点逻辑 再返回一个组件
// 所以hoc实际上返回的是一个组件 那再useDraggable的基础上还需要另外再创建一个组件？
// hoc是继承的关系吗？感觉算 在todo组件外增加一些特性
export default function useDraggable(dragId) {
  // dragstart
  // 待办  应该怎么增加回调呢
  function handleDragStart(e: DragEvent) {
    e.dataTransfer?.setData("dragId", dragId);
    // dragStartCb()
  }

  function handleDragEnd(e: DragEvent) {}

  function handleDragOver(e: DragEvent) {}

  const draggableProps = {
    draggable: true,
    onDragStart: (e: DragEvent) => handleDragStart(e),
    onDragEnd: (e: DragEvent) => handleDragEnd(e),
    onDragOver: (e: DragEvent) => handleDragOver(e),
  };
  return draggableProps;
}
