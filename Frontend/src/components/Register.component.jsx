import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");

  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      apiKey,
    };
    console.log("Register submit");
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) console.log("Registeration Failed");
    const userDetails = await response.json();
    console.log(userDetails);
    return navigate("/login");
  };
  return (
    <div className="title reg">
      <h1>Register</h1>
      <form className="reg-form" onSubmit={handleRegisterSubmit}>
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
        <label htmlFor="api" className="api-label">
          <input
            type="text"
            id="api"
            placeholder="api-key"
            className="api-input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <button type="submit" className="reg-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
