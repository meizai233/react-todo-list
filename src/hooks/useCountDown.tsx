// 写一个倒计时hook，入参是一个未来的时间戳，实时显示距离现在还剩多少秒。

import { useState, useEffect } from "react";

export default function useCountDown(timestamp: number) {
  // 实时显示 距离限制多少秒

  const [remainSec, setRemainSec] = useState();

  // 这里是
  useEffect(() => {
    console.log("date", timestamp);
    console.log("date - new Date()", (timestamp - Date.now()) / 1000);
    setInterval(() => {
      setRemainSec(Math.floor((timestamp - Date.now()) / 1000));
    }, 1000);
  }, []);

  return <>{remainSec}</>;
}
