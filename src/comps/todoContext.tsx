import { createContext } from "react";

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

const TodosContext = createContext(initData);
// ??? 如何对他进行初始化呢?
export default TodosContext;
