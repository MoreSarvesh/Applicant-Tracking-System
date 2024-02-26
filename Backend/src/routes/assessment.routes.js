const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createNewAssessment,
} = require("../controllers/assessment.controller.js");
const router = Router();

router.route("/create").post(verifyJWT, createNewAssessment);

module.exports = { assessmentRouter: router };
