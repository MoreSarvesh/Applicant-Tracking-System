import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Candidate from "../components/Candidate.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const AssesmentDetails = ({ title }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [candidates, setCandidates] = useState([]);

  let location = useLocation();

  useEffect(() => {
    console.log(location.state.id);
    fetch(
      `http://localhost:5000/assessment/getassessments/${location.state.id}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data.deatails);
        console.log(data.deatails);
      });
  }, []);
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
            {candidates?.map((candidate) => (
              <Candidate
                key={candidate._id}
                name={candidate.name}
                score={candidate.resumeScore}
                status={candidate.status}
                email={candidate.email}
                details={candidate.details}
                note={candidate.note}
                resume={candidate.resume}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AssesmentDetails;
