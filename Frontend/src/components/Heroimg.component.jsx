import heroimage from "../assets/images/heroimg.png";

import React from "react";

const Heroimg = () => {
  return (
    <div className="ats-img">
      <img src={heroimage} alt="ats-hero-image" width={"500px"} />
    </div>
  );
};

export default Heroimg;
