import { NavLink } from "react-router-dom";

const Joblist = ({ title, count, openings, hired, rejected, id }) => {
  console.log(title);
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
        {count} Candidate
        <div className="jb-actions">
          <button>{openings}-openings</button>
          <button>{hired}-hired</button>
          <button>{rejected}-rejected</button>
        </div>
      </div>
      <div className="public-links">
        public-link: http://localhost:5173/candidate/application/{id}
      </div>
    </li>
  );
};

export default Joblist;
