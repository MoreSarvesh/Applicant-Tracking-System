import { useState } from "react";

const CrerateAssessment = () => {
  const [title, setTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);

  const generateAssessment = (e) => {
    e.preventDefault();
    console.log("Generating Assessment");
  };
  const handleAssessmentSubmission = (e) => {
    e.prevenntDefault();
    console.log("Assesment Generated");
  };

  return (
    <div className="jb-form-container">
      <form onSubmit={handleAssessmentSubmission} className="jb-creation-form">
        <label htmlFor="title">
          Assessment Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label htmlFor="totalmarks">
          Total Marks:
          <input
            type="number"
            name="totalmarks"
            id="totalmarks"
            value={totalMarks}
            onChange={(e) => {
              setTotalMarks(e.target.value);
            }}
          />
        </label>
        <label htmlFor="prompt">Assessment Prompt:</label>{" "}
        <textarea
          name="prompt"
          id="prompt"
          cols="70"
          rows="5"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></textarea>
        <button
          onClick={(e) => {
            generateAssessment(e);
          }}
        >
          Generate Questions
        </button>
        <fieldset>
          <legend>Questions</legend>
        </fieldset>
        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
};

export default CrerateAssessment;
