import React from "react";

const Register = () => {
  return (
    <div className="title reg">
      <h1>Register</h1>
      <form action="#" className="reg-form">
        <label htmlFor="username" className="username-label">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="username-input"
          />
        </label>
        <label htmlFor="password" className="password-label">
          <input
            type="text"
            id="password"
            placeholder="Password"
            className="password-input"
          />
        </label>
        <label htmlFor="api" className="api-label">
          <input
            type="text"
            id="api"
            placeholder="api-key"
            className="api-input"
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
