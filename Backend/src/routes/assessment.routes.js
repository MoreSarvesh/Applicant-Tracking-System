const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createNewAssessment,
  generateQuestions,
} = require("../controllers/assessment.controller.js");
const router = Router();

router.route("/create").post(verifyJWT, createNewAssessment);
router.route("/generate").post(verifyJWT, generateQuestions);

module.exports = { assessmentRouter: router };
