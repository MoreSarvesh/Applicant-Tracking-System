const nodemailer = require("nodemailer");

const createTransporter = (user, pwd) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    auth: {
      user: user,
      pass: pwd,
    },
  });

  return transporter;
};

const setMailOptions = (user, to, subject, body) => {
  const mailOptions = {
    from: user,
    to: to.toString(),
    subject: subject,
    text: body,
  };

  return mailOptions;
};

const sendMail = async (mailTransporter, mailOPtions) => {
  try {
    const info = await mailTransporter.sendMail(mailOPtions);
    return info;
  } catch (error) {
    console.log(`Mail Error: ${error}`);
    return;
  }
};

module.exports = { createTransporter, setMailOptions, sendMail };
