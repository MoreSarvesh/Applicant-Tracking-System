const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createNewJob,
  retrieveJobs,
  retrieveJobDetails,
  updateFavourite,
  deleteJob,
} = require("../controllers/joblisting.controller.js");
const router = Router();

router.route("/postjob").post(verifyJWT, createNewJob);
router.route("/favourite").post(verifyJWT, updateFavourite);
router.route("/delete").post(verifyJWT, deleteJob);
router.route("/jobs").get(verifyJWT, retrieveJobs);
router.route("/jobs/:id").get(verifyJWT, retrieveJobDetails);

module.exports = { joblistingRouter: router };
