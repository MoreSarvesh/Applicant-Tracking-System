const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { storeCandidate } = require("../controllers/candidate.controller.js");

const router = Router();

router.route("/store").post(upload.single("resume"), storeCandidate);

module.exports = { candidateRouter: router };
