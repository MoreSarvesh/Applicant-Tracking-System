import { useState } from "react";
import { toast } from "react-toastify";

const CrerateAssessment = ({ setShowModal }) => {
  const [title, setTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [skillsToAssess, setSkillsToAssess] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [topicsCovered, setTopicsCovered] = useState("");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");

  const [generatedQuestions, setGeneratedQuestions] = useState("");
  const [disableGeneratedQuestions, setDisableGeneratedQuestions] =
    useState(true);

  //generate questions
  const generateAssessment = async (e) => {
    e.preventDefault();
    /*     const newQuestions = {
      skillsToAssess,
      totalQuestions,
      topicsCovered,
      difficultyLevel,
    };
    const response = await toast.promise(fetch("http://localhost:5000/assessment/generate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestions),
    }), {
    pending: "Waiting",
    success: "Success",
    error: "Error",
  });
    if (!response.ok) {
      const data = await response.json();
      console.log(" Failed To Assessment Generated");
      console.log(data.error);
    }
    const data = await response.json();
    console.log(data.data);
    setGeneratedQuestions(data.data);
    setDisableGeneratedQuestions(false); */
    setQuestions(JSON.parse(ques));
    setAnswers(ans.split(","));
    console.log("Assessment Generated");
    return toast.success("Assessment Generated");
  };

  //submit
  const handleAssessmentSubmission = async (e) => {
    e.preventDefault();
    const newAssessment = {
      title,
      totalMarks,
      questions,
      answers,
    };
    console.log(newAssessment);
    const response = await toast.promise(
      fetch("http://localhost:5000/assessment/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssessment),
      }),
      {
        pending: "Creating",
        success: "Successfully Created ",
        error: "Error",
      }
    );

    if (!response.ok) {
      const assessmentFailData = await response.json();
      console.log("Assessment Creation Failed");
      console.log(assessmentFailData);
      return toast.error(assessmentFailData.error);
    }
    console.log("New Job Created");
    const assessmentData = await response.json();
    console.log(assessmentData);
    setShowModal(false);
    return toast.success(assessmentData.message);
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
            placeholder="Enter Title"
            required
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
            required
          />
        </label>

        <label htmlFor="totalquestions">
          Total Questions:
          <input
            type="number"
            name="totalquestions"
            id="totalquestions"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
            required
          />
        </label>
        <label htmlFor="skillstoaccess">
          Skills To Access:
          <input
            type="text"
            name="skillstoaccess"
            id="skillstoaccess"
            value={skillsToAssess}
            onChange={(e) => setSkillsToAssess(e.target.value)}
            placeholder="What skills to Evaulate"
            required
          />
        </label>
        <label htmlFor="topicscovered">
          Topics to Cover:
          <input
            type="text"
            name="topicscovered"
            id="topicscovered"
            value={topicsCovered}
            onChange={(e) => setTopicsCovered(e.target.value)}
            placeholder="What Topics To Cover"
            required
          />
        </label>
        <label htmlFor="difficultyLevel">
          Difficulty level:
          <input
            type="text"
            name="difficultyLevel"
            id="difficultyLevel"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            placeholder="Set Difficulty Level"
            required
          />
        </label>
        <button
          onClick={(e) => {
            generateAssessment(e);
          }}
        >
          Generate Questions
        </button>
        <label htmlFor="generattedresponse">Generatted Response: </label>
        <textarea
          name="generattedresponse"
          id="generattedresponse"
          cols="70"
          rows="5"
          value={generatedQuestions}
          onChange={(e) => setGeneratedQuestions(e.target.value)}
          disabled={disableGeneratedQuestions}
          placeholder="Put Questions Array in 'Assessment Questions' and Answers Array in 'Assessment Answer'"
          required
        ></textarea>
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
          required
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
            required
          />
        </label>
        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
};

export default CrerateAssessment;
