import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'welcome'
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // 从localStorage加载用户数据
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    const savedCurrentUser = localStorage.getItem('currentUser');
    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
      setCurrentView('welcome');
    }
  }, []);

  // 保存用户数据到localStorage
  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  // 显示消息
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  // 注册功能
  const handleRegister = (username, password, confirmPassword) => {
    if (!username || !password || !confirmPassword) {
      showMessage('请填写所有字段', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('两次输入的密码不一致', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage('密码长度至少6位', 'error');
      return;
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
      showMessage('用户名已存在', 'error');
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      registeredAt: new Date().toLocaleString()
    };

    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    showMessage('注册成功！请登录', 'success');
    setTimeout(() => {
      setCurrentView('login');
    }, 1500);
  };

  // 登录功能
  const handleLogin = (username, password) => {
    if (!username || !password) {
      showMessage('请填写用户名和密码', 'error');
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentView('welcome');
      showMessage('登录成功！', 'success');
    } else {
      showMessage('用户名或密码错误', 'error');
    }
  };

  // 退出登录
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentView('login');
    showMessage('已退出登录', 'success');
  };

  // 登录组件
  const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(formData.username, formData.password);
    };

    return (
      <div className="container">
        <h2 className="form-title">用户登录</h2>
        {message && (
          <div className={`${messageType}-message`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="请输入用户名"
            />
          </div>
          <div className="form-group">
            <label>密码:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="请输入密码"
            />
          </div>
          <button type="submit" className="btn">登录</button>
        </form>
        <p>
          没有账号？
          <span 
            className="switch-form"
            onClick={() => setCurrentView('register')}
          >
            立即注册
          </span>
        </p>
      </div>
    );
  };

  // 注册组件
  const RegisterForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleRegister(formData.username, formData.password, formData.confirmPassword);
    };

    return (
      <div className="container">
        <h2 className="form-title">用户注册</h2>
        {message && (
          <div className={`${messageType}-message`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="请输入用户名"
            />
          </div>
          <div className="form-group">
            <label>密码:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="请输入密码（至少6位）"
            />
          </div>
          <div className="form-group">
            <label>确认密码:</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="请再次输入密码"
            />
          </div>
          <button type="submit" className="btn">注册</button>
        </form>
        <p>
          已有账号？
          <span 
            className="switch-form"
            onClick={() => setCurrentView('login')}
          >
            立即登录
          </span>
        </p>
      </div>
    );
  };

  // 欢迎页面组件
  const WelcomeScreen = () => {
    return (
      <div className="container">
        <div className="welcome-screen">
          <h1 className="welcome-title">欢迎回来！</h1>
          <p className="welcome-message">
            您好，<strong>{currentUser?.username}</strong>！
          </p>
          <p className="welcome-message">
            注册时间：{currentUser?.registeredAt}
          </p>
          <p className="welcome-message">
            当前共有 <strong>{users.length}</strong> 位注册用户
          </p>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            退出登录
          </button>
        </div>
      </div>
    );
  };

  // 根据当前视图渲染不同组件
  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return <RegisterForm />;
      case 'welcome':
        return <WelcomeScreen />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
};

export default App;
