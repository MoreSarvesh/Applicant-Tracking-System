const Assessmentlist = ({ title, attemptCount, passed, failed }) => {
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
        {attemptCount} Candidates
        <div className="jb-actions">
          <button>{passed}-Pass</button>
          <button>{failed}-Fail</button>
        </div>
      </div>
    </li>
  );
};

export default Assessmentlist;