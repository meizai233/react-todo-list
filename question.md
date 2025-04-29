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

  - 最终可以优化的方案
  - 对于批量让组件 drag，需要设置 draggable，dragStart，dragEnd 等，用个 useDrag，入参数为组件 id，返回参数为组件 props
  - 对于组件 drag 和 drop 过程中的数据 可以用 dataTransfer 存放
  - 对于批量让组件 drop，设置 dropEnd 事件
  - 那如何对应不同的 drag 和 drop 组？对应 drag 和 drop 的关系???

- 关于拖拽操作的基本实现及优化方案：

  - 需求：给 todo-item 设置 draggable, dragstart，给 todo-gap 设置 dragover，drop 事件，同时一个 todolist 需要维护一个单独的 curDragId
  - 方案 1: <TodoItem
          className="drag-todo-item"
          key={todo.id}
          todo={todo}
          clickRef={clickRef}
          onClick={todoListChangeIsEdit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          handleCurDrag={handleCurDrag}
          curDragRef={curDragRef}
        ></TodoItem> 传一坨给 todoItem todoItem 再一个个拿到并赋值给他的 div
  - 缺点：每个 item 都单独绑定了事件，待办，性能需要观察。且 todoItem 变得非常重逻辑非常多，drag 操作无法复用

  - 方案 2: useDraggable 返回一些 draggableProps 贴在 todoItem 上，<TodoItem className="drag-todo-item" todo={todo} clickRef={clickRef} onClick={todoListChangeIsEdit} dragProps={useDraggable(todo.id)}></TodoItem> 然后解构 dragProps
  - 缺点：todoItem 身上还是需要单独加 drag 的逻辑，久而久之会很重

  - 方案 3: HOC，function withDraggable(Component) {
    return function DragComp(props) {
    const { todo } = props;
    return <Component {...props} domProps={useDraggable(todo.id)} />;} 入参一个组件 return 一个函数组件
  - 优点：提高了 todoItem 的原子性 不需要侵入性的在 todoItem 中增加过多的 drag 逻辑。功能复用 内聚性更高
  - 缺点：嵌套过深 性能下降；难以调试

  - 方案 4: useDraggable + DragContainer，useDraggable 内聚 drag 逻辑，dragContainer 在 todoItem 外面套一层，这样就不用修改 todoItem 里的内容
  - 优点：不用对现有的组件进行修改
  - 缺点：目前看来没有啥缺点

- HOC 和组件包装的区别

  - HOC：是一个函数，用来增强一个组件（逻辑功能上
    - 创建：withDragger(Comp), return function (props){return <Comp/>} 返回了一个新的组件
    - 使用：const DraggerItem = withDragger(Item)
  - 组件包装：是一个组件 接受了另一个组件 他们是父子关系
    - 创建：和一个普通组件一样创建 外面可以套一些 div 样式啊之类 也可以套逻辑 然后把{children}放到想要的位置

- 我的想法：如果单纯用 useHook 会导致一个组件变得很臃肿功能很多，不够原子化，不以拆分功能。如果单纯用 HOC，加了很多功能的话会导致组件嵌套很深，不易维护而且可能有 props 冲突，来源也不清晰。那 HOC+useHooks？，可以灵活根据业务拆分组合不同的 HOC 逻辑，组件组合也可以灵活拆分和组合逻辑。

- 封装 useDrag 和 useDrop 遇到的问题和想法：

  - 本来打算组件组合+useDrag 实现，然后对于 useDrag 的回调函数可能依赖于其他地方的上下文（比如 handleDrop 中 setTodos，而 setTodos 依赖于业务组件，无法在 useDrop 的上下文执行，如果强行执行，需要把 setTodos 再作为入参传进去）这样的实现很不优雅而且数据源很不清晰，多层嵌套，且实现后也很难做扩展
  -

- 低代码的设计逻辑：
  - 有个 useDraggable hook 放到每个物料组件身上 然后用一个组件包裹一下这个物料组件
