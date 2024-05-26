import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal.component.jsx";

const CandidateAssessment = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cid, setCid] = useState("");
  const [opt, setOpt] = useState("");
  const [asnwers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [candidateid, setcandidateid] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/candidate/assessment/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.details);
        console.log(data.details);
      });
  }, []);

  const handleClickNext = (e) => {
    e.preventDefault();
    const ans = asnwers;
    ans[counter] = opt;
    setAnswers(ans);
    setCounter((prev) => prev + 1);
  };

  const handleClickPrevious = (e) => {
    e.preventDefault();
    const ans = asnwers;
    ans[counter] = opt;
    setAnswers(ans);
    setCounter((prev) => prev - 1);
  };

  const handleCandidateAssessmentSubmit = async (e) => {
    e.preventDefault();
    const ans = asnwers;
    ans[counter] = opt;
    setAnswers(ans);
    console.log(asnwers);
    const submission = {
      assessment_id: id,
      candidate_id: cid,
      answers: asnwers,
    };

    const response = await toast.promise(
      fetch("http://localhost:5000/candidate/evaluate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      }),
      {
        pending: "Submitting response",
      }
    );

    if (!response.ok) {
      console.log("Assessment Submission Failed");
      const assessmentSubmissionFailData = await response.json();
      console.log(assessmentSubmissionFailData);
      return toast.error(assessmentSubmissionFailData.error);
    }
    console.log("Assessment Submitted successfully");
    const assessmentSubmissionData = await response.json();
    console.log(assessmentSubmissionData);
    setcandidateid(assessmentSubmissionData.message);
    setShowModal(true);
    return;
  };

  return (
    <>
      {" "}
      <form className="cassessment" onSubmit={handleCandidateAssessmentSubmit}>
        <label htmlFor="cid">
          Applicant's ID:
          <input
            type="text"
            name="cid"
            id="cid"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          />
        </label>
        <div className="cassdiv">
          {(counter + 1).toString() + "/" + questions?.length}
          <fieldset>
            <legend>{questions[counter]?.question}</legend>
            {questions[counter]?.options.map((option) => (
              <label htmlFor={option} key={option}>
                <input
                  type="radio"
                  name={questions[counter].question}
                  id={option}
                  value={option}
                  onChange={(e) => setOpt(e.target.value)}
                />
                {" " + option}
              </label>
            ))}
          </fieldset>
        </div>
        <div className="util-btns">
          <button
            onClick={handleClickNext}
            disabled={counter + 1 > questions?.length - 1}
          >
            Next
          </button>
          <button onClick={handleClickPrevious} disabled={counter - 1 < 0}>
            Previous
          </button>
          <button type="submit">Submit Assessment</button>
        </div>
      </form>
      {showModal && (
        <Modal title="Successfully Attempted" setShowModal={setShowModal}>
          {candidateid}
        </Modal>
      )}
    </>
  );
};

export default CandidateAssessment;
