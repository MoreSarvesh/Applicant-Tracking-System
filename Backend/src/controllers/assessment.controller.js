const { Assessment } = require("../models/assessment.model.js");
const {
  Candidateassessment,
} = require("../models/candidateAssessment.model.js");

//create new asessment
const createNewAssessment = async (req, res) => {
  const { title, totalMarks, questions } = req.body;
  if (!title || !totalMarks || !questions)
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
  const { assessment_id, candidate_id, marks } = req.body;
  if (!assessment_id || !candidate_id || marks)
    return res.status(400).json({ error: "Feilds cannot be empty" });

  const candidateReattempted = await Candidateassessment.findOne({
    $and: [{ assessment_id }, { candidate_id }],
  });
  if (candidateReattempted)
    return res
      .status(409)
      .json({ error: "Candidate already attempted the assessment" });

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
