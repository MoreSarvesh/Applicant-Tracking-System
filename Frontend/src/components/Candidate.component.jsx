import CandidateDetails from "../components/CandidateDetails.component.jsx";
import { useState } from "react";

const Candidate = ({ name, score, status }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState(status);

  const updateCandidateStatus = (e) => {
    e.preventDefault();
    setCandidateStatus(e.target.value);
    //update status in db
  };
  return (
    <>
      <tr>
        <td onClick={() => setShowDetails((prev) => !prev)}>{name}</td>
        <td>{score}</td>
        <td>
          <form className="candidate-stage-form">
            <select
              name="candidate-stage"
              id="candidate-stage"
              value={candidateStatus}
              onChange={updateCandidateStatus}
            >
              <option value="applied">Applied</option>
              <option value="inprocess">in-progress</option>
              <option value="hire">Hire</option>
              <option value="Reject">Reject</option>
            </select>
          </form>
        </td>
        <td>
          <button>A</button>
        </td>
      </tr>
      {showDetails && <CandidateDetails />}
    </>
  );
};

export default Candidate;
