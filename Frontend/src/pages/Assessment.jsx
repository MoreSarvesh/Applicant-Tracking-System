import Assessmentlist from "../components/Assessmentlist.components.jsx";
import CrerateAssessment from "../components/CrerateAssessment.component.jsx";
import Modal from "../components/Modal.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import { useState, useEffect } from "react";

const Assessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);
  const [ass, setAss] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/assessment/getassessments", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAss(data.details);
        console.log(data.details);
      });
  }, []);

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
                {ass.map((assessment) => (
                  <Assessmentlist
                    key={assessment._id}
                    title={assessment.title}
                    attemptCount={assessment.count}
                    passed={passed}
                    failed={failed}
                    id={assessment._id}
                    favourite={assessment.favourite}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Create New Assessment" setShowModal={setShowModal}>
          <CrerateAssessment setShowModal={setShowModal} />
        </Modal>
      )}
      {ass.length == 0 ? <div className="no">No Assessment</div> : ""}
    </main>
  );
};

export default Assessment;
