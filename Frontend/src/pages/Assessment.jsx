import Assessmentlist from "../components/Assessmentlist.components.jsx";
import CrerateAssessment from "../components/CrerateAssessment.component.jsx";
import Modal from "../components/Modal.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import { useState } from "react";

const Assessment = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="jb-main">
      <Pageheader title="Assessments" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button onClick={() => setShowModal(true)}>New Assessment</button>
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
      {showModal && (
        <Modal title="Create New Assessment" setShowModal={setShowModal}>
          <CrerateAssessment />
        </Modal>
      )}
    </main>
  );
};

export default Assessment;
