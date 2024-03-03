import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="title">
      <h1>HR.GPT</h1>
      <h3>Applicant Tracking System</h3>
      <p>
        Discover the power of smarter hiring with HR.GPT. Our platform
        transforms traditional recruitment into an efficient and data-driven
        process. Recruiters harness advanced tools to curate job listings,
        evaluate candidates, and schedule interviews effortlessly. Leveraging
        AI-driven insights, HR.GPT ensures candidate-job fit, maximizing
        recruitment success rates.
      </p>
      <NavLink to="login">
        <button className="btn">Login</button>
      </NavLink>
      <NavLink to="register">
        <button className="btn">Register</button>
      </NavLink>
    </div>
  );
};

export default Hero;
