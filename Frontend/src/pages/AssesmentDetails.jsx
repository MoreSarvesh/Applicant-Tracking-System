import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Candidate from "../components/Candidate.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const AssesmentDetails = ({ title }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [candidates, setCandidates] = useState([]);

  let location = useLocation();
  let { assessment } = useParams();

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
        setCandidates(data.details);
        console.log(data.details);
      });
  }, []);
  return (
    <main className="jb-main">
      <Pageheader title={assessment} />
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
                score={candidate.marks}
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
