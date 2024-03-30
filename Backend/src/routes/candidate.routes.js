const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { storeCandidate } = require("../controllers/candidate.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const retrieveAllCandidates = require("../controllers/talentpool.controller.js");
const {
  candidateAssessment,
  handelAssessmentSubmission,
} = require("../controllers/assessment.controller.js");
const {
  candidateApplicationForm,
} = require("../controllers/joblisting.controller.js");

const router = Router();
//secure routes
router.route("/tallentpool").get(verifyJWT, retrieveAllCandidates);

//public routes
router.route("/store").post(upload.single("resume"), storeCandidate);
router.route("/assessment/:id").get(candidateAssessment);
router.route("/evaluate").post(handelAssessmentSubmission);
router.route("/application").get(candidateApplicationForm);

module.exports = { candidateRouter: router };
