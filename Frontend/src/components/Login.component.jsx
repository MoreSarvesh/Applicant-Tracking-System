import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted");
  };
  return (
    <div className="title login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label htmlFor="username" className="username-label">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="password-label">
          <input
            type="text"
            id="password"
            placeholder="Password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
