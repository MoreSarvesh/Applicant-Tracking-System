import { useState } from "react";
import Joblist from "../components/Joblist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import Modal from "../components/Modal.component.jsx";
import CreateJob from "../components/CreateJob.component.jsx";

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="jb-main">
      <Pageheader title="Job Listings" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button onClick={() => setShowModal(true)}>New Job</button>
          </div>
          <div className="listings">
            <div className="listings-job">
              <ul>
                <Joblist
                  title="Job 1"
                  count={16}
                  openings={10}
                  hired={4}
                  rejected={2}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Create New Job" setShowModal={setShowModal}>
          <CreateJob />
        </Modal>
      )}
    </main>
  );
};

export default Jobs;
