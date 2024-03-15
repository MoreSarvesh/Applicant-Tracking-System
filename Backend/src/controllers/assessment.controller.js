const { Assessment } = require("../models/assessment.model.js");
const {
  Candidateassessment,
} = require("../models/candidateAssessment.model.js");
const { Candidate } = require("../models/candidate.model.js");
const { OpenAI } = require("openai");
const { User } = require("../models/user.model.js");

//create new asessment
const createNewAssessment = async (req, res) => {
  const { title, totalMarks, questions, answers } = req.body;
  if (!title || !totalMarks || !questions || !answers)
    return res.status(400).json({ error: "Feilds cannot be empty" });

  try {
    const assessmentExists = await Assessment.findOne({ title });
    if (assessmentExists)
      return res.status(409).json({ error: "Assessment already exists" });
  } catch (error) {
    console.log(`Assessment.controller Error: ${error} `);
    return res.status(500).json({ error: "Something went wrong Assessment" });
  }

  try {
    const newAssessment = await Assessment.create({
      title,
      totalMarks,
      questions,
      answers,
      totalQuestions: questions.length,
      recruiter: req.user._id,
    });

    if (!newAssessment)
      return res.status(500).json({ error: "Could not create Assessment" });

    return res.status(201).json({
      message: `${title} Assessment Sucessfully created`,
      assesmentDetails: newAssessment,
    });
  } catch (error) {
    console.log(`Assessment.controller Error: ${error} `);
    return res.status(500).json({ error: "Could not create Assessment" });
  }
};

//handeling assessment submission
const handelAssessmentSubmission = async (req, res) => {
  let marks = 0;
  const { assessment_id, candidate_id, answers } = req.body;
  if (!assessment_id || !candidate_id || !answers)
    return res.status(400).json({ error: "Feilds cannot be empty" });

  const candidateReattempted = await Candidateassessment.findOne({
    $and: [{ assessment_id }, { candidate_id }],
  });
  if (candidateReattempted)
    return res
      .status(409)
      .json({ error: "Candidate already attempted the assessment" });

  const assessment = await Assessment.findById(assessment_id);
  if (!assessment) {
    console.log("Assessment submission error: ccouldnt find the assessment");
    return res.status(500).json({ error: "Something went worng" });
  }

  //calculatingg marks
  for (let i = 0; i < assessment.answers.length; i++) {
    if (assessment.answers[i] === answers[i]) marks++;
  }

  const newCandidateAttempt = await Candidateassessment.create({
    assessment_id,
    candidate_id,
    marks,
  });

  if (!newCandidateAttempt) {
    console.log("Candidate error: Clound not register candidates attempt");
    return res.status(500).json({ error: "Something went wrong" });
  }

  return res
    .status(201)
    .json({ message: `${candidate_id} submitted assessment sucessfully ` });
};

//generate questions
const generateQuestions = async (req, res) => {
  const { skillsToAssess, totalQuestions, topicsCovered, difficultyLevel } =
    req.body;
  const prompt = `As an HR professional, I need to create assignment questions to evaluate candidates. Please generate a set of questions based on the following details:
  1. Assignment Overview: The purpose of this assignment is to assess the candidate's ability in ${skillsToAssess}. The assignment will consist of ${totalQuestions} questions designed to evaluate the candidate.
  2. Question Types: Multiple choice questions
  3. Topics Covered in the assignment: ${topicsCovered}
  4. Difficulty level of questions: ${difficultyLevel}
  
  When generating questions, consider the following guidelines:
  1. Ensure that questions are clear, concise, and free from ambiguity.
  2. Include a mix of factual, conceptual, and application-based questions to assess different levels of understanding.
  3. The options should be plausible choices for each question.
  4. Additionally, provide an array of correct answers corresponding to the index of each question in the response array.

  The response should be in the following JSON object format:
  question_array = [
    {"question": "Question 1", "options": ["Option 1", "Option 2", "Option 3", "Option 4"]},
    {"question": "Question 2", "options": ["Option 1", "Option 2", "Option 3", "Option 4"]},
    {"question": "Question 3", "options": ["Option 1", "Option 2", "Option 3", "Option 4"]},
    {"question": "Question 4", "options": ["Option 1", "Option 2", "Option 3", "Option 4"]}
]

correct_answers = [index_of_correct_answer_for_question_1, index_of_correct_answer_for_question_2, index_of_correct_answer_for_question_3, index_of_correct_answer_for_question_4]
`;

  const user = await User.findById(req.user._id);

  const openai = new OpenAI({
    apiKey: user.apiKey,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistance of HR. Your task is to generate assignment question for evaluating the candidates.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  if (!completion) {
    console.log("Email Error: Could Not Generate Email Body");
    return res.status(500).json({ error: "Could not generate email" });
  }
  console.log(completion.choices[0].message.content);
  return res.status(201).json({ data: completion.choices[0].message.content });
};

//retrieve all assessments
const retrieveAssessments = async (req, res) => {
  const assessments = await Assessment.find({ recruiter: req.user._id });
  if (!assessments)
    return res.status(500).json({ error: "Could not retrieve assessments" });

  return res.status(200).json({
    message: "Seccessfully retrieved assessments",
    details: assessments,
  });
};

//assessment details
const retrieveAssessmentsDetails = async (req, res) => {
  const assessmentAttemptedCandidates = await Candidateassessment.find({
    assessment_id: req.params.id,
  });
  if (!assessmentAttemptedCandidates)
    return res
      .status(200)
      .json({ error: "Could not retrieve asssessment Details" });

  let candidates = [];
  for (let i = 0; i < assessmentAttemptedCandidates.length; i++) {
    const candidate = await Candidate.findById(
      assessmentAttemptedCandidates[i].candidate_id
    );
    if (candidate) {
      const updatedCandidate = {
        ...candidate._doc,
        marks: assessmentAttemptedCandidates[i].marks,
      };
      candidates = [...candidates, updatedCandidate];
    } else return res.status(500).json({ error: "Could Not find a Candidate" });
  }

  return res.status(200).json({ message: "Sucess", details: candidates });
};

//assessment for candidate
const candidateAssessment = async (req, res) => {
  const assessmentDetails = await Assessment.findById(req.params.id);
  if (!assessmentDetails)
    return res
      .status(500)
      .json({ error: "Could not retrieved Assessment Details" });

  return res.status(200).json({
    message: "Sucessfully retrieved Assessment Details",
    details: assessmentDetails.questions,
  });
};

module.exports = {
  createNewAssessment,
  handelAssessmentSubmission,
  generateQuestions,
  retrieveAssessments,
  retrieveAssessmentsDetails,
  candidateAssessment,
};
