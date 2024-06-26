import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ImStarEmpty } from "react-icons/im";
import { ImStarFull } from "react-icons/im";
import { FiUserCheck } from "react-icons/fi";
import { FiUserX } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
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
  const deleteJob = async () => {
    const response = await toast.promise(
      fetch("http://localhost:5000/joblistings/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }),
      { pending: "Deleting..", success: "Deleted Successfully", error: "Error" }
    );
    if (!response.ok) {
      console.log("Job Deletion Failed");
      const jobDeleteData = await response.json();
      console.log(jobDeleteData);
      return toast.error(jobDeleteData.error);
    }
    console.log("Job Deleted");
    const jobData = await response.json();
    console.log(jobData);
    return toast.success(jobData.message);
  };
  return (
    <li>
      <div className="jb-title">
        <NavLink className="links" to={title} state={{ id }}>
          {title}
        </NavLink>
        <div className="jb-actions">
          <button onClick={favouriteJob} className="fav">
            {fav ? <ImStarFull /> : <ImStarEmpty />}
          </button>
          <button onClick={deleteJob}>Delete</button>
        </div>
      </div>
      <div className="jb-info">
        {count} Candidate
        <div className="jb-actions">
          <button className="fav">
            {openings} <FiUserPlus />
          </button>
          <button className="fav">
            {hired} <FiUserCheck />
          </button>
          <button className="fav">
            {rejected} <FiUserX />
          </button>
        </div>
      </div>
      <div className="public-links">
        public-link: http://localhost:5173/candidate/application/{id}
      </div>
    </li>
  );
};

export default Joblist;
