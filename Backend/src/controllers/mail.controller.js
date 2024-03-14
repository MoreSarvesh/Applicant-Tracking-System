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

//generate email body

const generateBody = async (req, res) => {
  const {
    subject,
    recipient,
    backgroundContext,
    purpose,
    keyPoints,
    callToAction,
    attachmentsLinks,
    contactDetails,
  } = req.body;

  const prompt = `As an HR professional, I need to communicate effectively with candidates via email. Please generate email content with the following information:
  1. Subject: ${subject}
  2. Recipient's Name: ${recipient}
  3. Context and Background: ${backgroundContext}
  4. Purpose of the Email:${purpose}
  5. Key Points to Communicate: ${keyPoints}
  6. Call to Action: ${callToAction}
  7. Attachments or Links:${attachmentsLinks}
  8. Contact Information:${contactDetails}
  
  Instructions for writing email:
  1. Ensure that the tone of the emails is professional, courteous, and respectful.
  2. Include all necessary details and information in the email.
  3. Keep the emails concise and to the point, while still providing all essential information and limit the email to 200 words.
  4. Please provide the response in single paragraph and in plain text format.`;

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

module.exports = { composeMail, generateBody };
