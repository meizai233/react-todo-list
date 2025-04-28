// 作用: 让一个对象变得可拖动的，把一系列的drag值全都设置在该对象身上
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
