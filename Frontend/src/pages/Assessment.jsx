import Assessmentlist from "../components/Assessmentlist.components.jsx";
import CrerateAssessment from "../components/CrerateAssessment.component.jsx";
import Modal from "../components/Modal.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import { useState } from "react";

const Assessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="jb-main">
      <Pageheader title="Assessments" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form className="form-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Assessment"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
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
