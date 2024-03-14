import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      apiKey,
    };
    console.log("Register submit");
    console.log(newUser);
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
