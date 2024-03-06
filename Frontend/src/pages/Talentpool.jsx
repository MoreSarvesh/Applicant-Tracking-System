import React from "react";
import Talent from "../components/Talent.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Talentpool = () => {
  return (
    <main className="jb-main">
      <Pageheader title="Talent Pool" />
      <div className="talent-content">
        <div className="talent-col">
          <div className="talent-header">Candidate Name</div>
          <div className="talent-details">
            <ul>
              <Talent detail="sarvesh more" />
              <Talent detail="sarvesh more" />
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Job Profile</div>
          <div className="talent-details">
            <ul>
              <Talent detail="Gameplay developer" />
              <Talent detail="Gameplay developer" />
            </ul>
          </div>
        </div>
        <div className="talent-col">
          <div className="talent-header">Email Address</div>
          <div className="talent-details">
            <ul>
              <Talent detail="sarveshmore1324@gmail.com" />
              <Talent detail="sarveshmore1324@gmail.com" />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Talentpool;
