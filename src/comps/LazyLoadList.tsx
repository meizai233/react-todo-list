// LazyLoadingList.jsx
import { useState, useEffect, useTransition, useCallback, useRef } from "react";

// 模拟异步请求数据的函数
const fetchMoreItems = (startIndex, limit) => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      const newItems = Array.from({ length: limit }, (_, i) => ({
        id: startIndex + i,
        content: `Item ${startIndex + i}`,
      }));
      resolve(newItems);
    }, 500); // 1.5秒延迟，模拟网络请求
  });
};

// 组件主体
const LazyLoadingList = () => {
  // 状态管理
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  // 加载初始数据
  useEffect(() => {
    loadInitialItems();
  }, []);

  // 初始加载数据的函数
  const loadInitialItems = async () => {
    const initialItems = await fetchMoreItems(0, 20);
    setItems(initialItems);
  };

  // 加载更多数据
  const loadMoreItems = useCallback(async () => {
    if (isPending) return;

    const res = await fetchMoreItems(items.length, 20);
    startTransition(() => {
      setItems((items) => {
        return [...items, ...res];
      });
    });
  }, [isPending, page, items]);

  // 滚动检测
  useEffect(() => {
    // TODO: 实现 Intersection Observer 逻辑，监测滚动到底部
    // 当用户滚动到底部时调用 loadMoreItems()

    const observe = new IntersectionObserver(
      (entries) => {
        // 当观察的元素进入视口时
        if (entries[0].isIntersecting && hasMore && !isPending) {
          console.log("loadMoreItems");
          loadMoreItems();
        }
      },
      {
        // 配置项
        root: null, // 使用视口作为根元素
        rootMargin: "0px", // 视口边距
        threshold: 0.1, // 当目标元素10%进入视口时触发回调
      }
    );

    // 创建一个interssection 观察者 如果底部的 加载更多 进入view了 则触发加载
    if (loaderRef.current && hasMore) {
      observe.observe(loaderRef.current);
    }

    // 清理函数
    return () => {
      if (loaderRef.current) observe.unobserve(loaderRef.current);
    };
  }, [loadMoreItems, loaderRef, hasMore]);

  return (
    <div className="list-container">
      {/* 渲染列表项 */}
      <ul>
        {items.map((item) => (
          <li key={item.id} className="list-item">
            {item.content}
          </li>
        ))}
      </ul>

      {/* 底部加载指示器 */}
      {hasMore && (
        <div ref={loaderRef} className="loading-indicator">
          {isPending ? "加载中..." : "滚动加载更多"}
        </div>
      )}

      {!hasMore && <div className="end-message">已加载全部内容</div>}
    </div>
  );
};

export default LazyLoadingList;
