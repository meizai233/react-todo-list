// 实现一个简单的列表渲染与删除功能

import { useCallback, useEffect, useState } from "react";
import "./todoList.css";
import useClickOutside from "../hooks/useClickAway";
// 题目： 创建一个 TodoList 组件，能够渲染一个待办事项列表，并提供删除待办事项的功能。每个待办事项包括标题和一个删除按钮。

interface Todo {
  id: string;
  text: string;
  [key: string]: any;
}

const initData: Todo[] = [
  { id: "1", text: "Learn React" },
  { id: "2", text: "Build a project" },
  { id: "3", text: "Practice coding" },
];

export default function TodoList() {
  // 好像每次渲染都会处理一遍 会不会浪费性能
  initData.forEach((v) => (v.isEdit = false));

  const [todos, setTodos] = useState(initData);

  const [inputTodo, setInputTodo] = useState("");

  const [curEditId, setCurEditId] = useState("");

  const deleteTodo = useCallback((id) => {
    setTodos((todos) => todos.filter((v) => v.id !== id));
  }, []);

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

  const editTodo = useCallback((e, id) => {
    setTodos((pre) => pre.map((v) => (v.id === id ? { ...v, text: e.target.value } : v)));
  }, []);

  // 在鼠标点击别处的时候 取消编辑模式

  const changeIsEdit = useCallback((id) => {
    setTodos((todos) => {
      // 错误: 违反了不可变更新???? 待办
      // 是哪里不可变 直接赋值不对吗
      return todos.map((v) => {
        if (v.id === id) {
          // 不应该直接更改
          // v.isEdit = true;
          // 应该拷贝一下
          return { ...v, isEdit: !v.isEdit };
        }
        return v;
      });
    });
    debugger;
    setCurEditId(id);
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  const handleSubmit = useCallback(() => {}, []);

  // 应该怎么抽hooks比较好？ hook应该更加通用 不局限于某个方法

  // 这里直接是一个函数的缓存
  // 只要在mousedown的时候就会执行
  const handleClick = useCallback(() => {
    console.log("first", curEditId);
    setTodos((pre) => pre.map((v) => (v.id === curEditId ? { ...v, isEdit: false } : v)));
  }, [curEditId]);

  // 这样有什么问题? 会反复渲染吗 会的 因此 把这个缓存一下
  // useClickOutside(
  //   `todo_item_${curEditId}`,
  //   () => {
  //     console.log("first");
  //     setTodos((pre) => pre.map((v) => (v.id === curEditId ? { ...v, isEdit: false } : v)));
  //   },
  //   [curEditId]
  // );

  useClickOutside(handleClick, `todo_item_${curEditId}`);

  return (
    <>
      <input
        placeholder="输入待办事项"
        onInput={(e) => {
          setInputTodo(e.target?.value);
        }}
      ></input>
      <button onClick={addTodo}>添加</button>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <button onClick={() => deleteTodo(todo.id)}>x</button>
          <button onClick={() => changeIsEdit(todo.id)}>Edit</button>
          <div className="text-item">
            {todo.isEdit ? <input id={`todo_item_${todo.id}`} value={todo.text} onInput={(e) => editTodo(e, todo.id)} onBlur={() => changeIsEdit(todo.id)}></input> : <span>{todo.text}</span>}
          </div>
          <br />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
