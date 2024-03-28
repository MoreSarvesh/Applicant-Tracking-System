import { NavLink } from "react-router-dom";

const Assessmentlist = ({ title, attemptCount, passed, failed, id }) => {
  return (
    <li>
      <div className="jb-title">
        <NavLink className="links" to={title} state={{ id }}>
          {title}
        </NavLink>
        <div className="jb-actions">
          <button>star</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        {attemptCount} Candidates
        <div className="jb-actions">
          <button>{passed}-Pass</button>
          <button>{failed}-Fail</button>
        </div>
      </div>
      <div className="public-links">
        public-link: http://localhost:5173/candidate/assessment/{id}
      </div>
    </li>
  );
};

export default Assessmentlist;
