const { Mail } = require("../models/mail.model.js");
const {
  createTransporter,
  setMailOptions,
  sendMail,
} = require("../utils/mailTransporter.js");
const { OpenAI } = require("openai");
const { User } = require("../models/user.model.js");

//composenew mail
const composeMail = async (req, res) => {
  const { user, pwd, to, subject, body } = req.body;
  if (!to || !subject || !body)
    return res.status(400).json({ error: "Feilds Cannnot be Empty" });

  //sending mail
  const mailTransporter = createTransporter(user, pwd);
  const mailOptions = setMailOptions(user, to, subject, body);
  const mailInfo = sendMail(mailTransporter, mailOptions);

  if (!mailInfo) return res.status(500).json({ error: "Could not send email" });

  const newMail = await Mail.create({
    to,
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

//generate email body

const generateBody = async (req, res) => {
  const { subject, recipient, purpose, keyPoints, attachmentsLinks } = req.body;

  const prompt = `As an HR professional, I need to communicate effectively with candidates via email. Please generate email content with the following information:
  1. Subject: ${subject}
  2. Recipient's Name: ${recipient}
  3. Purpose of the Email:${purpose}
  5. Key Points to Communicate: ${keyPoints}
  7. Attachments or Links:${attachmentsLinks || "none"}
  
  Instructions for writing email:
  3. Exclude Subject from your response.
  4. Keep the emails concise and to the point, and limit the your response to 150 words and in plain text format.`;

  const user = await User.findById(req.user._id);

  const openai = new OpenAI({
    apiKey: user.apiKey,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistance of HR. Your task is to write main content for emails on behalf of the HR.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  if (!completion) {
    console.log("Email Error: Could Not Generate Email Body");
    return res.status(500).json({ error: "Could not generate email" });
  }
  console.log(completion.choices[0].message.content);
  return res.status(201).json({ data: completion.choices[0].message.content });
};

//retrieve all emails
const retrieveMails = async (req, res) => {
  const mails = await Mail.find({ recruiter: req.user._id });
  if (!mails)
    return res.status(500).json({ error: "Could not retrieve Emails" });

  return res
    .status(200)
    .json({ message: "Sucessfully retrieved emails", details: mails });
};

module.exports = { composeMail, generateBody, retrieveMails };
