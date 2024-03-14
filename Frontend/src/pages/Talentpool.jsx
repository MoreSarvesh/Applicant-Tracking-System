import React, { useState } from "react";
import Talent from "../components/Talent.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Talentpool = () => {
  const [name, setName] = useState("");
  const [jobProfile, setJobProfile] = useState("");
  const [email, setEmail] = useState("");
  return (
    <main className="jb-main">
      <Pageheader title="Talent Pool" />
      <div className="talent-content">
        <div className="talent-col">
          <div className="talent-header">Candidate Name</div>
          <div className="talent-details">
            <ul>
              <Talent detail={name} />
              <Talent detail={name} />
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Job Profile</div>
          <div className="talent-details">
            <ul>
              <Talent detail={jobProfile} />
              <Talent detail={jobProfile} />
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Email Address</div>
          <div className="talent-details">
            <ul>
              <Talent detail={email} />
              <Talent detail={email} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Talentpool;
