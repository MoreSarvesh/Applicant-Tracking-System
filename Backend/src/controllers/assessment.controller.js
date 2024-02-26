const { Assessment } = require("../models/assessment.model.js");

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

module.exports = { createNewAssessment };
