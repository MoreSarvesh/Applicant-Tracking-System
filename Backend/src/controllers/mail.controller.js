const { Mail } = require("../models/mail.model.js");
const {
  createTransporter,
  setMailOptions,
  sendMail,
} = require("../utils/mailTransporter.js");

//composenew mail
const composeMail = async (req, res) => {
  const { user, pwd, to, cc, subject, body } = req.body;
  if (!to || !subject || !body)
    return res.status(400).json({ error: "Feilds Cannnot be Empty" });

  const mailTransporter = createTransporter(user, pwd);
  const mailOptions = setMailOptions(user, to, subject, body);
  const mailInfo = sendMail(mailTransporter, mailOptions);

  if (!mailInfo)
    return res.status(500).json({ error: "CCould not send email" });

  const newMail = await Mail.create({
    to,
    cc,
    subject,
    body,
    recruiter: req.user._id,
  });

  if (!newMail) {
    console.log("Could not store email");
    return res.status(500).json({ error: "Could not store email" });
  }

  return res.status(200).json({ message: "Mail Sent Successfully" });
};

module.exports = { composeMail };
