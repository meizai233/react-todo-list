export default function useDroppable(dropId) {
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    // 这里判断回调?
    console.log(e.dataTransfer?.getData("dragId"));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  return {
    onDrop: handleDrop,
    onDragOver: handleDragOver,
  };
}
