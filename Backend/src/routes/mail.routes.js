const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  composeMail,
  generateBody,
  retrieveMails,
} = require("../controllers/mail.controller.js");
const router = Router();

router.route("/compose").post(verifyJWT, composeMail);
router.route("/generate").post(verifyJWT, generateBody);
router.route("/listmail").get(verifyJWT, retrieveMails);

module.exports = { mailRouter: router };
