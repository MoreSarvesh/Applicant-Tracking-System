import { useState } from "react";
import Joblist from "../components/Joblist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import Modal from "../components/Modal.component.jsx";
import CreateJob from "../components/CreateJob.component.jsx";

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="jb-main">
      <Pageheader title="Job Listings" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form className="form-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Job"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
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
