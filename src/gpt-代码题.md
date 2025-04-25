好的！以下是一些常见的 React 面试编程题，涉及不同难度和核心概念。你可以根据需要选择一个或多个进行练习。每个题目都附带了简要的描述，帮助你理解问题的背景。

### 1. **实现一个计数器组件**

**题目**：
实现一个简单的 React 计数器组件。该组件应包含以下功能：

- 显示当前计数
- 按钮可以增加、减少计数
- 按钮可以重置计数

```jsx
import React, { useState } from "react";

function Counter() {
  // 在这里写代码实现计数器
}

export default Counter;
```

### 2. **实现一个条件渲染组件**

**题目**：
实现一个组件，根据给定的 `isLoggedIn` 状态来显示不同的内容。

- 如果 `isLoggedIn` 为 `true`，显示 "Welcome back!"
- 如果 `isLoggedIn` 为 `false`，显示 "Please log in"

```jsx
import React from "react";

function Greeting({ isLoggedIn }) {
  // 在这里实现条件渲染
}

export default Greeting;
```

### 3. **实现一个简单的列表渲染与删除功能**

**题目**：
创建一个 `TodoList` 组件，能够渲染一个待办事项列表，并提供删除待办事项的功能。每个待办事项包括标题和一个删除按钮。

```jsx
import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Practice coding" },
  ]);

  // 在这里实现删除功能
}

export default TodoList;
```

### 4. **实现一个输入框，按键实时更新状态**

**题目**：
创建一个组件，包含一个输入框，当用户输入内容时，实时更新状态并显示在页面上。

```jsx
import React, { useState } from "react";

function TextInput() {
  // 在这里实现输入框和状态更新
}

export default TextInput;
```

### 5. **实现一个表单验证**

**题目**：
创建一个登录表单，包含 `用户名` 和 `密码` 字段。表单提交时：

- 如果字段为空，显示相应的错误信息
- 如果字段不为空，则显示 "登录成功"

```jsx
import React, { useState } from "react";

function LoginForm() {
  // 在这里实现表单和验证逻辑
}

export default LoginForm;
```

### 6. **使用 `useEffect` 实现数据加载**

**题目**：
创建一个组件，模拟从 API 加载数据并展示。使用 `useEffect` 来触发数据加载。可以使用 `setTimeout` 或 `setInterval` 来模拟异步请求。

```jsx
import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟异步数据请求
    setTimeout(() => {
      setData("Fetched data from API");
      setLoading(false);
    }, 2000);
  }, []);

  return <div>{loading ? <p>Loading...</p> : <p>{data}</p>}</div>;
}

export default DataFetcher;
```

### 7. **实现一个自定义 Hook - `useLocalStorage`**

**题目**：
创建一个自定义 Hook `useLocalStorage`，用于将数据存储在浏览器的 `localStorage` 中。该 Hook 需要提供读取和更新 `localStorage` 的能力。

```jsx
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // 在这里实现自定义 hook
}

export default useLocalStorage;
```

### 8. **实现一个拖拽排序组件**

**题目**：
实现一个简单的拖拽排序组件，用户可以通过拖拽列表项来重新排序。每个列表项有一个文本和一个删除按钮。

```jsx
import React, { useState } from "react";

function DraggableList() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);

  // 在这里实现拖拽排序功能
}

export default DraggableList;
```

### 9. **实现一个组件，支持动态主题切换**

**题目**：
实现一个支持主题切换（浅色模式/深色模式）的组件。使用 `useState` 来存储当前的主题，并使用 `useEffect` 来更新页面的样式。

```jsx
import React, { useState, useEffect } from "react";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // 根据主题设置页面的样式
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Theme</button>
    </div>
  );
}

export default ThemeSwitcher;
```

### 10. **实现一个懒加载组件**

**题目**：
实现一个懒加载组件，当组件进入视口时才开始加载显示其内容。你可以使用 `IntersectionObserver` API 来实现这个效果。

```jsx
import React, { useState, useEffect } from "react";

function LazyLoadComponent() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(document.getElementById("lazy-load"));
    return () => observer.disconnect();
  }, []);

  return <div id="lazy-load">{inView ? <p>This is lazily loaded content!</p> : <p>Loading...</p>}</div>;
}

export default LazyLoadComponent;
```

### 总结

这些问题涵盖了 React 的常见功能和常用概念（如状态管理、事件处理、生命周期、条件渲染、表单验证等）。你可以选择其中的一些来练习，或者根据面试的难度进行调整。完成这些题目后，你也可以通过与别人讨论或者与真实项目的需求结合来提升自己的 React 实战能力。

如果你有兴趣尝试某个具体的题目，或者遇到困难，随时可以告诉我，我会提供帮助！
