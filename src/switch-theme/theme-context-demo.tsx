import { useContext } from "react";
import "./index.css";
import { ThemeContext } from "../contexts";

export default function MyTheme({ setTheme }) {
  const theme = useContext(ThemeContext);
  return (
    <>
      {/* 要求: 点击这个按钮切换颜色 用context */}
      <button onClick={() => setTheme((pre) => (pre === "red" ? "blue" : "red"))}>switch theme</button>
      <div className={theme === "red" ? "red" : "blue"}>Welcome suda</div>
    </>
  );
}
