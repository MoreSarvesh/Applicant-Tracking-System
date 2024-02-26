const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const { composeMail } = require("../controllers/mail.controller.js");
const router = Router();

router.route("/compose").post(verifyJWT, composeMail);

module.exports = { mailRouter: router };
