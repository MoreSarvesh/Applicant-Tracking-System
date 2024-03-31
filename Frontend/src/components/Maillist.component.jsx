const Maillist = ({ subject, to, date }) => {
  return (
    <li>
      <div className="jb-title">
        Subject: {subject}
        <div className="jb-actions">
          <button>star</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        To: {to}
        <div className="jb-actions">Date: {date.substr(0, 10)}</div>
      </div>
    </li>
  );
};

export default Maillist;
