const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  composeMail,
  generateBody,
} = require("../controllers/mail.controller.js");
const router = Router();

router.route("/compose").post(verifyJWT, composeMail);
router.route("/gegnerate").post(verifyJWT, generateBody);

module.exports = { mailRouter: router };
