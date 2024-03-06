import Assessmentlist from "../components/Assessmentlist.components.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Assessment = () => {
  return (
    <main className="jb-main">
      <Pageheader title="Assessments" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button>New Assessment</button>
          </div>
          <div className="listings">
            <div className="listings-job">
              <ul>
                <Assessmentlist
                  title="Assessment 1"
                  attemptCount={10}
                  passed={7}
                  failed={3}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Assessment;
