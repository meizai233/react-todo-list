// ErrorBoundary.js - 错误边界组件
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // 当子组件抛出错误时调用
  static getDerivedStateFromError(error) {
    // 更新状态，以便下一次渲染显示备用UI
    return { hasError: true };
  }

  // 捕获错误信息和组件栈
  componentDidCatch(error, errorInfo) {
    // 可以将错误日志发送到服务器
    console.error("组件发生错误:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 渲染备用UI
      return (
        <div className="error-container">
          <h2>出错了！</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>查看详细信息</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => this.setState({ hasError: false })} className="retry-button">
            重试
          </button>
        </div>
      );
    }

    // 一切正常时渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
