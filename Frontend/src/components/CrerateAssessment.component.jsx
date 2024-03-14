import { useState } from "react";

const CrerateAssessment = ({ setShowModal }) => {
  const [title, setTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");

  const generateAssessment = (e) => {
    e.preventDefault();
    setQuestions(JSON.parse(ques));
    setAnswers(ans.split(","));
    console.log("Generating Assessment");
  };
  const handleAssessmentSubmission = (e) => {
    e.preventDefault();
    const newAssessment = {
      title,
      totalMarks,
      questions,
      answers,
    };
    console.log("Assesment Generated");
    console.log(newAssessment);
    setShowModal(false);
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
        <label htmlFor="questions">Assessment Questions:</label>
        <textarea
          name="questions"
          id="questions"
          cols="70"
          rows="5"
          value={ques}
          onChange={(e) => {
            setQues(e.target.value);
          }}
        ></textarea>
        <label htmlFor="answers">
          Assessment Answers:
          <input
            type="text"
            name="answers"
            id="answers"
            value={ans}
            onChange={(e) => {
              setAns(e.target.value);
            }}
          />
        </label>
        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
};

export default CrerateAssessment;
