const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-top">
        <div>
          <h3>HYR-GPT</h3>
        </div>
        <ul>
          <li>Dashboard</li>
          <li>Jobs Listing</li>
          <li>Assessments</li>
          <li>Send Mails</li>
          <li>Talent Pool</li>
        </ul>
      </div>
      <div className="nav-bottom">
        <ul>
          <li>Settings</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
