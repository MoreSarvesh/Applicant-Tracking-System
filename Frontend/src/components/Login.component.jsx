import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    console.log("Login Submitted");
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.log("Login Failed");
      return toast.error("Invalid Credentials!");
    }
    const userDetails = await response.json();
    console.log(userDetails);
    toast.success(`Welcome ${userDetails.userInfo.username}`);
    return navigate("/ats");
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
            required
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
            required
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
