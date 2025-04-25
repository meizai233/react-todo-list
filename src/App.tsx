import "./App.css";
import TodoList from "./comps/todoList";

function App() {
  // const targetDate = new Date().getTime() + 60000;

  // const countDown = useCountDown(targetDate);

  return (
    <>
      {/* 1. 距离未来还剩{countDown}秒 2. <Couter />
      3. <IsLogged islogged={true} /> */}
      <TodoList />
    </>
  );
}

export default App;
