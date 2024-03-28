import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CandidateAssessment = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [cid, setCid] = useState("");
  const [opt, setOpt] = useState("");
  const [asnwers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(0);
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

    const response = await fetch("http://localhost:5000/candidate/evaluate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      console.log("Assessment Submission Failed");
      const assessmentSubmissionFailData = await response.json();
      console.log(assessmentSubmissionFailData);
      return;
    }
    console.log("Assessment Submitted successfully");
    const assessmentSubmissionData = await response.json();
    console.log(assessmentSubmissionData);
  };

  return (
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
  );
};

export default CandidateAssessment;
