const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createNewAssessment,
  generateQuestions,
  retrieveAssessments,
  retrieveAssessmentsDetails,
  updateAssessmentFavourite,
  deleteAssessment,
} = require("../controllers/assessment.controller.js");
const router = Router();

router.route("/create").post(verifyJWT, createNewAssessment);
router.route("/favourite").post(verifyJWT, updateAssessmentFavourite);
router.route("/delete").post(verifyJWT, deleteAssessment);
router.route("/generate").post(verifyJWT, generateQuestions);
router.route("/getassessments").get(verifyJWT, retrieveAssessments);
router.route("/getassessments/:id").get(verifyJWT, retrieveAssessmentsDetails);

module.exports = { assessmentRouter: router };
