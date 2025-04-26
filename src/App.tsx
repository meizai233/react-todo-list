import "./App.css";
import { useState } from "react";
import TodosProvider from "./contexts/todo-context";
import TodoList from "./comps/todoList";
function App() {
  // const targetDate = new Date().getTime() + 60000;

  // const countDown = useCountDown(targetDate);

  const [theme, setTheme] = useState("red");
  return (
    <>
      {/* ??? 这里的value应该传什么? 为什么不是初始化的initData 他和初始值有什么关系 */}
      <TodosProvider>
        <TodoList />
      </TodosProvider>
    </>
  );
}

export default App;
