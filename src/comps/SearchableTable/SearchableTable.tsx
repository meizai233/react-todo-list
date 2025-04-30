import { useCallback, useEffect, useRef, useState, useTransition } from "react";

// 模拟大数据集
const generateData = () => {
  // 假设这是一个包含大量项目的数据集
  return Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    category: `Category ${i % 5}`,
    price: Math.floor(Math.random() * 1000),
  }));
};

// 使用人工延迟模拟网络请求
const fakeApiCall = (query, allData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(query, "query");
      const results = allData.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));
      resolve(results);
    }, 100);
  });
};

function SearchableTable() {
  // 所有数据
  const [allData] = useState(generateData);

  // 搜索查询
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤后的数据
  const [filteredData, setFilteredData] = useState(allData);

  // 使用 useTransition
  const [isPending, startTransition] = useTransition();

  const debounceTimerRef = useRef(null);

  // 处理搜索输入变化
  const handleSearchChange = useCallback(
    function handleSearchChange(e) {
      // TODO: 实现搜索逻辑，处理防抖和 useTransition

      const query = e.target.value;
      setSearchQuery(query);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        // 这是耗时任务

        // React 不会等待 async 函数内的 Promise 全部解决，它只关注同步执行的部分
        const results = await fakeApiCall(query, allData);

        startTransition(() => {
          setFilteredData(results);
        });
      }, 500);
    },
    [allData, searchQuery]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // 表格渲染
  return (
    <div className="searchable-table">
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="搜索..." className="search-input" />
        {/* ??? 如何知道isPending的状态 */}
        {isPending && <span className="loading-indicator">搜索中...</span>}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>类别</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, 50).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length > 50 && <div className="table-footer">显示前 50 项，共 {filteredData.length} 项</div>}
    </div>
  );
}

export default SearchableTable;
