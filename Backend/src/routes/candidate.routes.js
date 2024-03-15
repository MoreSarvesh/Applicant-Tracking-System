const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { storeCandidate } = require("../controllers/candidate.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const retrieveAllCandidates = require("../controllers/talentpool.controller.js");
const {
  candidateAssessment,
} = require("../controllers/assessment.controller.js");

const router = Router();

router.route("/tallentpool").get(verifyJWT, retrieveAllCandidates);

router.route("/store").post(upload.single("resume"), storeCandidate);
router.route("/assessment/:id").get(candidateAssessment);

module.exports = { candidateRouter: router };
