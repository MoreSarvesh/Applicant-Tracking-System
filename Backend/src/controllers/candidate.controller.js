require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
const similarity = require("compute-cosine-similarity");
const pdfParse = require("pdf-parse");
const { Candidate } = require("../models/candidate.model.js");
const { Job } = require("../models/job.model.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

//regoster candidate
const storeCandidate = async (req, res) => {
  const { jobid } = req.query;
  const { name, email, details } = req.body;
  //console.log(details);
  const candidateDetails = JSON.parse(details);
  //console.log(candidateDetails);

  const candidateExists = await Candidate.findOne({
    $and: [{ appliedJob: jobid }, { email }],
  });
  if (candidateExists)
    return res.status(409).json({ error: `${name} already applied` });

  //extracting text
  const pdfText = await pdfParse(req.file.path);

  const findJob = await Job.findById(jobid);

  if (!pdfText || !jobid || !findJob) {
    console.log("candidate error: could not find resume text or job");
    return res.status(500).json({ "Server error": "Something went wrong" });
  }
  //console.log(`Name: ${req.body.name}`);
  //console.log(`File: ${pdfText.text}`);

  //generating embeddings
  const jd = findJob.description;
  const candidateResume = pdfText.text;
  //console.log(jd);
  const model = await use.load();
  const sentences = [candidateResume, jd];
  const embeddinbgs = await model.embed(sentences);
  if (!embeddinbgs) {
    console.log("candidate Error: failed to generate embeddings");
    return res.status(500).json({ "Server error": "SSomething went wrong" });
  }
  const vector = embeddinbgs.arraySync();

  //calculating the resume score
  const score = (similarity(vector[0], vector[1]) * 10).toFixed(2);

  //uploading resume on cloudinary
  const resumeURL = await uploadOnCloudinary(req.file.path);
  if (!resumeURL) {
    console.log("candidate error: Could not upload resume on cloudinary");
    return res
      .status(500)
      .json({ ServerError: "Could not upload file on Cloudinary" });
  }

  const newCandidate = await Candidate.create({
    appliedJob: findJob._id,
    name: name,
    email: email,
    resume: resumeURL,
    resumeScore: score,
    details: candidateDetails,
  });

  if (!newCandidate) {
    console.log("Candidate error: Cound not store to mongoDB");
    return res
      .status(500)
      .json({ ServerError: "Cold not store candidate details" });
  }

  //send ackwnoledgement email

  return res.status(201).json({ msg: `${name} Successfully Applied` });
};

module.exports = { storeCandidate };
