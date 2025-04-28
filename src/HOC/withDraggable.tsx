import useDraggable from "../hooks/useDraggable";

// 入参是一个React组件 返回值是一个新的组件
// 其中 这个返回的组件可以用函数包裹 作为一个函数组件
// ??? 待办 这个需要和useDraggable放在一个文件吗 hoc和hooks的组织架构是怎样的
export default function withDraggable(Component) {
  return function DragComp(props) {
    const { todo } = props;
    return <Component {...props} domProps={useDraggable(todo.id)} />;
  };
}
