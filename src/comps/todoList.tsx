// 实现一个简单的列表渲染与删除功能

import { useCallback, useContext, useEffect, useState } from "react";
import "./todoList.css";
import useClickOutside from "../hooks/useClickAway";
import { FilterStates, useFilterTodos } from "../hooks/useFilterTodos";
import TodoItem from "./todoItem";
import { TodosContext } from "../contexts/todo-context";
// 题目： 创建一个 TodoList 组件，能够渲染一个待办事项列表，并提供删除待办事项的功能。每个待办事项包括标题和一个删除按钮。

export default function TodoList() {
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
        <TodoItem key={todo.id} todo={todo} clickRef={clickRef} onClick={todoListChangeIsEdit}></TodoItem>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
