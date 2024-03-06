import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-top">
        <div>
          <h3>HYR-GPT</h3>
        </div>
        <ul>
          <li>
            <NavLink to="/ats">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="jobs">Job Listing</NavLink>
          </li>
          <li>
            <NavLink to="assessments">Assessments</NavLink>
          </li>
          <li>
            <NavLink to="emails">Emails</NavLink>
          </li>
          <li>
            <NavLink to="talentpool">Talent Pool</NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-bottom">
        <ul>
          <NavLink to="settings">Settings</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
