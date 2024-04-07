import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Assessmentlist = ({ title, attemptCount, id, favourite }) => {
  const [fav, setFav] = useState(favourite);

  //fav
  const updateAssessmentFav = async () => {
    setFav((prev) => !prev);
    const obj = {
      id: id,
      favourite: !fav,
    };
    const response = await fetch("http://localhost:5000/assessment/favourite", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      console.log("Assessment Updatte Failed");
      const assessmentUpdatelData = await response.json();
      console.log(assessmentUpdatelData);
      return;
    }
    console.log("Assessment Updated");
    const assessmentData = await response.json();
    console.log(assessmentData);
  };

  //delete
  const handleDelete = async () => {
    const response = toast.promise(
      fetch("http://localhost:5000/assessment/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }),
      {
        pending: "Deleting",
        success: "Deleted successfully",
        error: "Something went wrong!",
      }
    );

    if (!response.ok) {
      console.log("Assessment deletion Failed");
      const assessmentDeletionlData = await response.json();
      console.log(assessmentDeletionlData);
      return toast.error(assessmentDeletionlData.error);
    }
    console.log("Assessment Delete");
    const assessmentData = await response.json();
    console.log(assessmentData);
    return toast.success(assessmentData.message);
  };
  return (
    <li>
      <div className="jb-title">
        <NavLink className="links" to={title} state={{ id }}>
          {title}
        </NavLink>
        <div className="jb-actions">
          <button onClick={updateAssessmentFav}>
            {fav ? "true" : "false"}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="jb-info">{attemptCount} Candidates</div>
      <div className="public-links">
        public-link: http://localhost:5173/candidate/assessment/{id}
      </div>
    </li>
  );
};

export default Assessmentlist;
