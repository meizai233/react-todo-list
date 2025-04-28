- contexts 在项目中的层级一般是怎样的？

  - 可以单独放在 context 文件夹下面，
    1. createContext() 可以包括静态 value 和动态方法
    2. 在此之上 统一提供 value 即创建一个 ThemeProvider
    3. 在此之上，基于业务组合多个 ThemeProvider
    4. 或者，用一个 useThemeProvider hooks

  待办

  - 每个 todoItem 都注册了一个 drag 事件 可以优化
  - drag 的时候 应该放在两个 item 的中间 所以在两个 item 中间放个 div drag 到 div 的时候 改变顺序
  - 所以还是在 todolist 封装一个 useDraggable，drag 的时候给一个回调函数表示 drag 要做啥，drop 的时候给一个回调函数表示 drop 要做啥。但是 drag 和 drop 是 todoItem 层面的呀??? useDraggable 应该返回什么??? 返回一个可以拖拽的实例?那我是不是需要频繁注册监听器和取消
  -

  - 方案 1 drag 的逻辑放在 todoItem，但是感觉一个 list 只有 1 个 drag 和 drop
  - 方案 2 逻辑放在 todoList 里，drag 和 drop 的逻辑都传给子组件
  - 方案 3 useDrag() 返回：当前的 drag 对象 ref 传参: 需要被 drag 的对象，以及需要被 drop 的对象，以及 dragstart 的 cb，dragover 的 cb，drop 的 cb
