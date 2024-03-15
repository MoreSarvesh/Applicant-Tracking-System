import React from "react";

const CandidateDetails = ({ email, details, note, resume }) => {
  return (
    <tr className="candidate-details-row">
      <td colSpan="4">
        <div className="candidate-details">
          <p>Email: {email}</p>
          <p>Resume: {resume}</p>
          {details.map((detail) => (
            <p key={detail.value}>
              {detail.label}: {detail.value}
            </p>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default CandidateDetails;
