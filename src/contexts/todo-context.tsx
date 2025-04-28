import { createContext, useCallback, useState } from "react";

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

initData.forEach((v) => {
  v.isEdit = false;
  v.isDone = false;
});

const initContext = { todos: initData, setTodos: (todos) => {}, changeIsDone: () => {}, changeIsEdit: () => {}, editTodo: () => {}, deleteTodo: () => {}, curDragTodo: null };

export const TodosContext = createContext(initContext);

function TodosProvider({ children }) {
  const [todos, setTodos] = useState(initData);

  // 勾选的时候没有触发重新渲染
  const changeIsDone = useCallback((id) => {
    setTodos((todos) =>
      todos.map((v) => {
        if (v.id === id) {
          return { ...v, isDone: !v.isDone };
        }
        return v;
      })
    );
  }, []);

  const changeIsEdit = useCallback((id, callback) => {
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
        return { ...v };
      });
    });
    if (callback) callback(id);
  }, []);

  const editTodo = useCallback((e, id) => {
    setTodos((pre) => pre.map((v) => (v.id === id ? { ...v, text: e.target.value } : v)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((todos) => todos.filter((v) => v.id !== id));
  }, []);

  return <TodosContext.Provider value={{ todos, setTodos, changeIsDone, changeIsEdit, editTodo, deleteTodo }}>{children}</TodosContext.Provider>;
}
export default TodosProvider;
