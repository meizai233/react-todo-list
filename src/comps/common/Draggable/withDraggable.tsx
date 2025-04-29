import useDraggable from "./useDraggable";

// 入参是一个React组件 返回值是一个新的组件
// 其中 这个返回的组件可以用函数包裹 作为一个函数组件

// 不再更新
export default function withDraggable(Component) {
  return function DragComp(props) {
    const { todo } = props;
    return <Component {...props} domProps={useDraggable(todo.id)} />;
  };
}
