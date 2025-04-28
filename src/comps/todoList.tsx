// 实现一个简单的列表渲染与删除功能

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./todoList.css";
import useClickOutside from "../hooks/useClickAway";
import { FilterStates, useFilterTodos } from "../hooks/useFilterTodos";
import TodoItem from "./todoItem";
import { TodosContext } from "../contexts/todo-context";
import TodoItemGap from "./todoItemGap";
import withDraggable from "../HOC/withDraggable";
import useDroppable from "../hooks/useDroppable";
// 题目： 创建一个 TodoList 组件，能够渲染一个待办事项列表，并提供删除待办事项的功能。每个待办事项包括标题和一个删除按钮。

export default function TodoList() {
  // 待办 有一个问题 context应该是每个todolist里唯一的 也就是说每个todolist都应该有一个独享的todosContext 这个怎么做呢?

  const { todos, setTodos, changeIsEdit } = useContext(TodosContext);

  const [inputTodo, setInputTodo] = useState("");

  const [tab, setTab] = useState(FilterStates.ALL);

  const changeTab = useCallback((isDone: string) => {
    switch (isDone) {
      case FilterStates.ALL:
        setTab(FilterStates.ALL);
        break;
      case FilterStates.ACTIVE:
        setTab(FilterStates.ACTIVE);
        break;
      case FilterStates.COMPLETED:
        setTab(FilterStates.COMPLETED);
        break;
      default:
        break;
    }
  }, []);

  const visibleTodos = useFilterTodos(todos, tab);

  const [curEditId, setCurEditId] = useState("");

  const addTodo = useCallback(
    () => {
      // 唯一id除了用当前时间 还能用啥
      // 有没有更简洁的方式
      // 空输入验证
      if (inputTodo === "") {
        alert("输入为空!");
        return;
      }
      // 对于复制大量对象这种场景 思考: 如何优化性能
      // 1. 分页显示
      // 2. 虚拟列表 外面一个固定的窗口 监听滚动事件
      // 3. immerJs
      setTodos((todos) => [...todos, { id: `${Date.now()}_${Math.random() * 100}`, text: inputTodo }]);
      setInputTodo("");
    },
    // 为什么要在依赖这里加inputTodo 因为... 最开始的函数对象拿到的是为空的inputTodo的闭包
    // 因此useCallback里所有的变量(不包括闭包)都要inputTodo
    [inputTodo]
  );

  // 全选的逻辑
  const [checkAll, setCheckAll] = useState(true);

  useEffect(() => {
    setTodos((todos) => todos.map((v) => ({ ...v, isDone: checkAll })));
  }, [checkAll]);

  useEffect(() => {}, [todos]);
  const handleSubmit = useCallback(() => {}, []);

  // 只要在mousedown的时候就会执行
  const handleClick = useCallback(() => {
    if (curEditId) {
      setTodos((pre) => pre.map((v) => (v.id === curEditId ? { ...v, isEdit: false } : v)));
    }
  }, [curEditId]);

  // id变化的时候执行
  useEffect(() => {
    // 如果是编辑状态则focus
    if (curEditId) clickRef.current?.focus();
  }, [curEditId]);

  let clickRef = useClickOutside(handleClick);

  // 键盘保存编辑模式
  // 监听键盘事件
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.code === "Enter") {
        // 此时这里的addTodo又是最开始那个addTodo 所以里面有任何变量都需要添加到依赖里面
        addTodo();
      }
    },
    [addTodo]
  );

  const clearChecked = useCallback(() => {
    setTodos((pre) => pre.filter((v) => !v.isDone));
  }, []);

  // 同步到本地
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  const todoListChangeIsEdit = useCallback((id) => changeIsEdit(id, setCurEditId), [curEditId]);

  const curDragRef = useRef(null);

  const handleCurDrag = useCallback((id) => {
    // 把当前对象置为drag
    curDragRef.current = id;
  }, []);

  function handleDragStart(id) {
    handleCurDrag(id);
  }

  // 拖拽到上方事件
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(dropId) {
    // ??? 为什么要阻止默认行为 因为默认行为是阻止drop 那会不会阻止其他默认行为呢？
    // e.preventDefault();
    const dragId = curDragRef.current;
    setTodos((pre) => {
      const dragItem = pre.find((v) => v.id === dragId);
      const todos = pre.filter((v) => v.id !== dragId);

      const dropIndex = todos.findIndex((v) => v.id === dropId);
      todos.splice(dropIndex, 0, dragItem);
      console.log(todos, "after");
      return todos;
    });
  }

  const DraggableTodo = withDraggable(TodoItem);

  return (
    <>
      <input
        placeholder="输入待办事项"
        onInput={(e) => {
          // 按理来说onInput时一直在修改inputtodo 然后keydown的时候直接保存 没什么问题呢
          setInputTodo(e.target?.value);
        }}
        onKeyDown={handleKeyDown}
        value={inputTodo}
      ></input>
      <button onClick={addTodo}>添加</button>
      <button onClick={() => setCheckAll((pre) => !pre)}>全选</button>
      <button onClick={clearChecked}>清除所选</button>
      <div className="">
        <button onClick={() => changeTab(FilterStates.ALL)}>全部</button>
        <button onClick={() => changeTab(FilterStates.COMPLETED)}>已完成</button>
        <button onClick={() => changeTab(FilterStates.ACTIVE)}>未完成</button>
      </div>
      {visibleTodos.map((todo) => (
        // 给这个元素加一个dragstart事件 drop 这样会不会每个元素都注册 造成开销??? 待办
        <div key={todo.id}>
          <DraggableTodo className="drag-todo-item" todo={todo} clickRef={clickRef} onClick={todoListChangeIsEdit}></DraggableTodo>
          <TodoItemGap todo={todo} dropProps={useDroppable(todo.id)}></TodoItemGap>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
