import React, { useContext } from "react";
import { TodosContext } from "../../contexts/todo-context";

const TodoItem = React.memo(function TodoItem({ todo, clickRef, onClick, ...props }) {
  // props传todo过来 那对于todo的增删改查 应该放在item还是放在父组件呢？
  // 如果放在子组件 那相当于修改了父组件的props 不符合单项数据流的规范

  // 如果放在父组件 父组件需要传给子组件crud的方法 子组件调用父组件的方法 父组件身上会很臃肿

  // 哪个比较好？父组件修改子组件的话要查找id，不知道性能会不会开销大 但一般来说这点性能不算什么
  // 子组件修改自己的属性的话 只是修改todo 需要setTodo 但是todos不知情 组件可能不会重新渲染

  // 在鼠标点击别处的时候 取消编辑模式

  const { domProps } = props;
  const { changeIsDone, changeIsEdit, editTodo, deleteTodo, setTodos } = useContext(TodosContext);

  return (
    <>
      <div key={todo.id} className="todo-item" {...domProps}>
        <input type="checkbox" name="选项组名" checked={todo.isDone} onChange={() => changeIsDone(todo.id)}></input>
        {/* <label for="选项ID">选项文本</label> */}
        <button onClick={() => onClick(todo.id)}>Edit</button>
        <div className="text-item">
          {todo.isEdit ? <input ref={todo.isEdit ? clickRef : null} value={todo.text} onInput={(e) => editTodo(e, todo.id)} onBlur={() => changeIsEdit(todo.id)}></input> : <span>{todo.text}</span>}
        </div>
        <button className="delete-todo" onClick={() => deleteTodo(todo.id)}>
          x
        </button>
        <br />
      </div>
    </>
  );
});

export default TodoItem;
