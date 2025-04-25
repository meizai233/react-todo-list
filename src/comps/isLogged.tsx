// 实现一个条件渲染组件
// 题目： 实现一个组件，根据给定的 isLoggedIn 状态来显示不同的内容。

// 如果 isLoggedIn 为 true，显示 "Welcome back!"

// 如果 isLoggedIn 为 false，显示 "Please log in"
export default function IsLogged({ islogged }: { islogged: boolean }) {
  // console.log(islogged);
  return <>{islogged ? `Welcome back!` : `Please log in`}</>;
}
