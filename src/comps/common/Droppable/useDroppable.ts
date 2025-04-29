interface dropParams {
  data: { [key: string]: any };
  dropCb: (...args: any[]) => void;
  [key: string]: any;
}

export default function useDroppable(params: dropParams) {
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    // 这里判断回调?
    console.log(e.dataTransfer?.getData("dragId"));
    const { data, dropCb } = params;
    dropCb && dropCb(e, data);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  return {
    onDrop: handleDrop,
    onDragOver: handleDragOver,
  };
}
