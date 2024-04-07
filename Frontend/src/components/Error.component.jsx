import { NavLink, useRouteError } from "react-router-dom";

const Error = () => {
  const errorMessage = useRouteError();
  console.log(errorMessage.error);
  return (
    <div className="error-container">
      <div className="error-content">
        <h3 className="error-heading">Oops! Something went wrong</h3>
        <p className="error-message">{errorMessage.error.message}</p>
        <NavLink to="/" className="error-link">
          Return to Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
