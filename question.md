- contexts 在项目中的层级一般是怎样的？
  - 可以单独放在 context 文件夹下面，
    1. createContext() 可以包括静态 value 和动态方法
    2. 在此之上 统一提供 value 即创建一个 ThemeProvider
    3. 在此之上，基于业务组合多个 ThemeProvider
    4. 或者，用一个 useThemeProvider hooks
