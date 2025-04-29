import "../TodoList/todoList.css";
export default function TodoItemGap({ todo, ...props }) {
  // console.log(todo, props);
  const { dropProps } = props;
  return <div className="todo-gap" {...dropProps}></div>;
}
