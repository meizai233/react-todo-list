// 过滤todos

import { useMemo } from "react";

// 枚举类型
export enum FilterStates {
  ALL = "all",
  COMPLETED = "completed",
  ACTIVE = "active",
}
export function useFilterTodos(todos: Array<Object>, tab: string) {
  return useMemo(() => {
    console.log("hahha");
    switch (tab) {
      case FilterStates.ALL:
        return todos;
      case FilterStates.ACTIVE:
        return todos.filter((v) => !v.isDone);
        break;
      case FilterStates.COMPLETED:
        return todos.filter((v) => v.isDone);
        break;
      default:
        return [];
    }
  }, [todos, tab]);
}
