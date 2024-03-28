import React, { useState, useEffect } from "react";
import Talent from "../components/Talent.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Talentpool = () => {
  const [name, setName] = useState("");
  const [jobProfile, setJobProfile] = useState("");
  const [email, setEmail] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/candidate/tallentpool", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data.details);
        console.log(data.details);
      });
  }, []);

  return (
    <main className="jb-main">
      <Pageheader title="Talent Pool" />
      <div className="talent-content">
        <div className="talent-col">
          <div className="talent-header">Candidate Name</div>
          <div className="talent-details">
            <ul>
              {candidates?.map((candidate) => (
                <Talent key={candidate._id} detail={candidate.name} />
              ))}
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Job Profile</div>
          <div className="talent-details">
            <ul>
              {candidates?.map((candidate) => (
                <Talent key={candidate._id} detail={candidate.appliedJob} />
              ))}
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Email Address</div>
          <div className="talent-details">
            <ul>
              {candidates?.map((candidate) => (
                <Talent key={candidate._id} detail={candidate.email} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Talentpool;
