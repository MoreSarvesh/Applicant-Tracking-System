import { useState } from "react";
import { NavLink } from "react-router-dom";

const Joblist = ({
  title,
  count,
  openings,
  hired,
  rejected,
  id,
  favourite,
}) => {
  const [fav, setFav] = useState(favourite);

  //favourite a job
  const favouriteJob = async () => {
    setFav((prev) => !prev);
    const obj = {
      jid: id,
      favourite: !fav,
    };
    const response = await fetch(
      "http://localhost:5000/joblistings/favourite",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    if (!response.ok) {
      console.log("Job Updatte Failed");
      const jobUpdatelData = await response.json();
      console.log(jobUpdatelData);
      return;
    }
    console.log("Job Updated");
    const jobData = await response.json();
    console.log(jobData);
  };

  //delete a job
  const deleteJob = () => {};
  return (
    <li>
      <div className="jb-title">
        <NavLink className="links" to={title} state={{ id }}>
          {title}
        </NavLink>
        <div className="jb-actions">
          <button onClick={favouriteJob}>{fav ? "true" : "false"}</button>
          <button onClick={deleteJob}>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        {count} Candidate
        <div className="jb-actions">
          <button>{openings}-openings</button>
          <button>{hired}-hired</button>
          <button>{rejected}-rejected</button>
        </div>
      </div>
      <div className="public-links">
        public-link: http://localhost:5173/candidate/application/{id}
      </div>
    </li>
  );
};

export default Joblist;
