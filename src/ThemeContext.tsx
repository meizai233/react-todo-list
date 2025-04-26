// 1. 创建 ThemeContext

import { createContext, useContext, useState } from "react";

// 这里实现 ThemeContext

// 用一个red太单调了信息量不够
// const ThemeContext = createContext("red");
const ThemeContext = createContext({ theme: "red", toggleTheme: () => {} });

// 2. 创建 ThemeProvider 组件

function ThemeProvider({ children }) {
  // 在这里实现 ThemeProvider 组件的逻辑
  const [theme, setTheme] = useState("red");

  const toggleTheme = () => setTheme((pre) => (pre === "red" ? "blue" : "red"));

  // setTheme给谁???

  return (
    // 返回 Provider 包裹的 children
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

// 3. 创建 ThemeToggle 组件

function ThemeToggle() {
  // 在这里实现主题切换按钮的逻辑
  const { toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>主题切换</button>;
}

// 4. 创建 ThemedBox 组件

function ThemedBox() {
  // 在这里实现根据主题变化显示不同样式的组件
  const themeCtx = useContext(ThemeContext);

  return <div className={themeCtx.theme === "red" ? "red" : "blue"}>Welcome suda</div>;
}

// 5. 创建应用组件

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>主题切换示例</h1>
        <ThemeToggle />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
}

export default App;
