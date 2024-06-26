require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
const similarity = require("compute-cosine-similarity");
const pdfParse = require("pdf-parse");
const { Candidate } = require("../models/candidate.model.js");
const { Job } = require("../models/job.model.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

//register candidate
const storeCandidate = async (req, res) => {
  const { jobid } = req.query;
  const { name, email, details } = req.body;
  //console.log(name, email, details);
  const candidateDetails = JSON.parse(details);
  //console.log(candidateDetails);
  const candidateDetailsEntriesArray = Object.entries(candidateDetails);
  const cDetails = candidateDetailsEntriesArray.map((details) => {
    return {
      label: details[0],
      value: details[1],
    };
  });

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
    return res.status(500).json({ error: "Something went wrong" });
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
    return res.status(500).json({ error: "Something went wrong" });
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
    details: cDetails,
  });

  if (!newCandidate) {
    console.log("Candidate error: Cound not store to mongoDB");
    return res
      .status(500)
      .json({ ServerError: "Cold not store candidate details" });
  }

  //send ackwnoledgement email

  return res.status(201).json({
    message: `${name} Successfully Applied`,
    candidateId: newCandidate._id,
  });
};

//retrieve candidate
const retireveCandiates = async (req, res) => {
  const candiates = await Candidate.find({ appliedJob: req.params.id });
  if (!candiates)
    return res.status(500).json({ error: "Could not retrieve candidates" });

  return res
    .status(200)
    .json({ message: "Sucessfully retrived Candidates", deatails: candiates });
};

module.exports = { storeCandidate, retireveCandiates };
