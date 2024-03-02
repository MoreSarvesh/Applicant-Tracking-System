const { Assessment } = require("../models/assessment.model.js");
const {
  Candidateassessment,
} = require("../models/candidateAssessment.model.js");

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
    return res
      .status(500)
      .json({ "Server error": "Something went wrong Assessment" });
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
      return res
        .status(500)
        .json({ "Server error": "Could not create Assessment" });

    return res.status(201).json({
      message: `${title} Assessment Sucessfully created`,
      assesmentDetails: newAssessment,
    });
  } catch (error) {
    console.log(`Assessment.controller Error: ${error} `);
    return res
      .status(500)
      .json({ "Server error": "Could not create Assessment" });
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
    return res.status(500).json({ "Server error": "Something went worng" });
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
    return res.status(500).json({ "Server error": "Something went wrong" });
  }

  return res
    .status(201)
    .json({ message: `${candidate_id} submitted assessment sucessfully ` });
};

module.exports = { createNewAssessment, handelAssessmentSubmission };
