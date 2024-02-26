const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const { createNewJob } = require("../controllers/joblisting.controller.js");
const router = Router();

router.route("/postjob").post(verifyJWT, createNewJob);

module.exports = { joblistingRouter: router };
