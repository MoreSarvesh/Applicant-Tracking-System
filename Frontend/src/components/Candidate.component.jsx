import CandidateDetails from "../components/CandidateDetails.component.jsx";
import { useState } from "react";

const Candidate = ({ name, score, status }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <tr>
        <td onClick={() => setShowDetails((prev) => !prev)}>{name}</td>
        <td>{score}</td>
        <td>
          <form action="#" className="candidate-stage-form">
            <select
              name="candidate-stage"
              id="candidate-stage"
              defaultValue={status}
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
