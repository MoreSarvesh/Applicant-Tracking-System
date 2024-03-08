import Candidate from "../components/Candidate.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const AssesmentDetails = ({ title }) => {
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
            <Candidate name="sarvesh more" score={10} status="hire" />
            <Candidate name="sarvesh more" score={10} status="applied" />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AssesmentDetails;
