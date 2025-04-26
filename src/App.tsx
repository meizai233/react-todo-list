import "./App.css";
import MyTheme from "./switch-theme/theme-context-demo";
import { ThemeContext } from "./contexts";
import { useState } from "react";
function App() {
  // const targetDate = new Date().getTime() + 60000;

  // const countDown = useCountDown(targetDate);

  const [theme, setTheme] = useState("red");
  return (
    <>
      {/* ??? 这里的value应该传什么? 为什么不是初始化的initData 他和初始值有什么关系 */}
      {/* <TodosContext.Provider value={[]}>
        <TodoList />
      </TodosContext.Provider> */}

      <ThemeContext.Provider value={theme}>
        <MyTheme setTheme={setTheme} />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
