import Joblist from "../components/Joblist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Jobs = () => {
  return (
    <main className="jb-main">
      <Pageheader title="Job Listings" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button>New Job</button>
          </div>
          <div className="listings">
            <div className="listings-job">
              <ul>
                <Joblist title="Job 1" count={16} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
