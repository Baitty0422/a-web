// React Hello World 组件
const HelloWorld = () => {
    const [count, setCount] = React.useState(0);
    const [message, setMessage] = React.useState('Hello, World!');

    const handleClick = () => {
        setCount(count + 1);
        setMessage(`你已经点击了 ${count + 1} 次！`);
    };

    const resetCount = () => {
        setCount(0);
        setMessage('Hello, World!');
    };

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">🎉 React Hello World 🎉</h1>
                <p className="subtitle">使用CDN快速搭建的React应用</p>
            </header>
            
            <main className="main-content">
                <div className="message-box">
                    <h2 className="message">{message}</h2>
                    <div className="counter">
                        <span className="count-text">点击次数: </span>
                        <span className="count-number">{count}</span>
                    </div>
                </div>
                
                <div className="button-group">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleClick}
                    >
                        点击我！
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={resetCount}
                    >
                        重置
                    </button>
                </div>
                
                <div className="info-section">
                    <h3>技术栈</h3>
                    <ul className="tech-list">
                        <li>React 18 (CDN)</li>
                        <li>React DOM 18 (CDN)</li>
                        <li>Babel Standalone (JSX转换)</li>
                        <li>纯CSS样式</li>
                    </ul>
                </div>
            </main>
            
            <footer className="footer">
                <p>© 2025 React Hello World Demo</p>
            </footer>
        </div>
    );
};

// 渲染应用到DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HelloWorld />);