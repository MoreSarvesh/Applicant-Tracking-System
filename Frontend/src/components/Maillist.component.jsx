import { NavLink } from "react-router-dom";

const Maillist = ({ subject, to, date }) => {
  return (
    <li>
      <div className="jb-title">
        <NavLink className="links" to="mails">
          {subject}
        </NavLink>
        <div className="jb-actions">
          <button>star</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        To: {to}
        <div className="jb-actions">
          <button>{date}</button>
        </div>
      </div>
    </li>
  );
};

export default Maillist;
