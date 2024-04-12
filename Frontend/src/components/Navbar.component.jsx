import { NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.jpeg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-top">
        <div>
          <h3>HR.GPT</h3>
        </div>
        <ul>
          <li>
            <NavLink className="nav-link" to="/ats">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="jobs">
              Job Listing
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="assessments">
              Assessments
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="emails">
              Emails
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="talentpool">
              Talent Pool
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-bottom">
        <ul>
          <li>
            <NavLink className="nav-link" to="settings">
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
