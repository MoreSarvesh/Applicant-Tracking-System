import { useState } from "react";
import Candidate from "../components/Candidate.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const AssesmentDetails = ({ title }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  return (
    <main className="jb-main">
      <Pageheader title={title} />
      <div className="jb-details-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Stage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <Candidate name={name} score={score} status={status} />
            <Candidate name={name} score={score} status={status} />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AssesmentDetails;
