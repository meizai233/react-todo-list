// 描述: 点击某个元素以外的区域 触发的事件

// 所做的事情: 创建一个副作用函数 处理mousedown在某元素之外的事件 并调用callback函数，该副作用函数在callback更新时会进行同步更新
import { useEffect, useRef } from "react";

export default function useClickOutside(callback: () => void) {
  // 创建一个useRef 暴露这个ref过来 把这个标签贴到某个元素身上 表示除了这个元素 点击其他地方都触发
  let ref = useRef<HTMLElement>(null);
  // 那e在哪里传递？ e是触发事件自动传递的。。。不是显式传递的。。
  // 在鼠标点击其他地方的时候 取消编辑状态
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 如果e在input之外的话

      if (ref && ref.current?.contains(e.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // hook依赖callback callback依赖他的依赖
  }, [callback]);

  return ref;
}
