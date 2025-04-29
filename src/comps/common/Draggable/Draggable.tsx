import React from "react";
import useDraggable from "./useDraggable";

const Draggable = React.memo(function Draggable({ children, dragId }) {
  const draggableProps = useDraggable({
    data: {
      dragId,
    },
  });

  return <div {...draggableProps}>{children}</div>;
});

export default Draggable;
