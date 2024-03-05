const Joblist = ({ title, count, openings, hired, rejected }) => {
  return (
    <li>
      <div className="jb-title">
        {title}
        <div className="jb-actions">
          <button>star</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        {count} Candidate
        <div className="jb-actions">
          <button>{openings}openings</button>
          <button>{hired}hired</button>
          <button>{rejected}rejected</button>
        </div>
      </div>
    </li>
  );
};

export default Joblist;
