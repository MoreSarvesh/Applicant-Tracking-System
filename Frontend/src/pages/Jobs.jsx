import { useState } from "react";
import Joblist from "../components/Joblist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import Modal from "../components/Modal.component.jsx";
import CreateJob from "../components/CreateJob.component.jsx";
import { useEffect } from "react";

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [openings, setOpenings] = useState(0);
  const [hired, setHired] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [jbData, setJbData] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch("http://localhost:5000/joblistings/jobs", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setJbData(data.details);
        console.log(data.details);
      });
  }, []);

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
                {jbData.map((job) => {
                  return (
                    <Joblist
                      key={job._id}
                      title={job.title}
                      count={job.totalCount}
                      openings={job.openings}
                      hired={job.hired}
                      rejected={job.rejected}
                      id={job._id}
                      favourite={job.favourite}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Create New Job" setShowModal={setShowModal}>
          <CreateJob setShowModal={setShowModal} />
        </Modal>
      )}
      {jbData.length == 0 ? <div className="no">No Job</div> : ""}
    </main>
  );
};

export default Jobs;
