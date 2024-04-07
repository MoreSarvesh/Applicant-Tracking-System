const { Job } = require("../models/job.model.js");
const { Candidate } = require("../models/candidate.model.js");

//create new job
const createNewJob = async (req, res) => {
  const { title, description, openings, applicationForm } = req.body;
  if (!title || !description || !openings || !applicationForm)
    return res.status(400).json({ error: "Feilds cannot be empty" });

  try {
    const jobExists = await Job.findOne({ title });
    if (jobExists) return res.status(409).json({ error: "Job already exists" });
  } catch (error) {
    console.log(`jobLisiting.controller error: ${error}`);
    return res.status(500).json({ error: "Something went wrong Joblisting" });
  }
  try {
    const newJob = await Job.create({
      title,
      description,
      openings,
      applicationForm,
      recruiter: req.user._id,
    });
    if (!newJob)
      return res
        .status(500)
        .json({ error: `could not create new job ${title}` });

    return res.status(200).json({
      message: `${title} Successfully created`,
      jobDetails: newJob,
    });
  } catch (error) {
    console.log(`jobLisiting.controller error: ${error}`);
    return res.status(400).json({ error: `could not create new job ${title}` });
  }
};

//get all jobs
const retrieveJobs = async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user._id });
  if (!jobs) return res.status(500).json({ error: "Could Not Retrieve Jobs" });
  let jobsData = [];

  for (let i = 0; i < jobs.length; i++) {
    const candidates = await Candidate.find({ appliedJob: jobs[i]._id });
    const selectedCandidates = candidates.filter(
      (candiate) => candiate.status === "HIRED"
    );
    const rejectedCandiddates = candidates.filter(
      (candidate) => candidate.status === "REJECTED"
    );
    const data = {
      ...jobs[i]._doc,
      totalCount: candidates.length,
      hired: selectedCandidates.length,
      rejected: rejectedCandiddates.length,
    };
    jobsData.push(data);
  }

  sortedjobsData = jobsData.sort((a, b) => {
    if (a.favourite && b.favourite) return 0;
    if (a.favourite) return -1;
    else 1;
  });
  return res
    .status(200)
    .json({ message: "Sucessfully fetched jobs", details: sortedjobsData });
};

//get job details
const retrieveJobDetails = async (req, res) => {
  const candiates = await Candidate.find({ appliedJob: req.params.id });
  if (!candiates)
    return res.status(500).json({ error: "Could not retrieve candidates" });
  return res
    .status(200)
    .json({ message: "Sucessfully retrived Candidates", deatails: candiates });
};

//get job application details
const candidateApplicationForm = async (req, res) => {
  const job = await Job.findById(req.query.jid);
  if (!job) return res.status(500).json({ error: "Could Not Find Job!" });
  return res.status(200).json({
    message: "Sucessfully Retrieved application Form",
    details: job.applicationForm,
    title: job.title,
  });
};

//update favourite
const updateFavourite = async (req, res) => {
  const { jid, favourite } = req.body;
  /* console.log(favourite); */
  const job = await Job.findById(jid);
  if (!job) return res.status(500).json({ error: "Could not find job" });

  job.favourite = favourite;
  try {
    {
      const updatedJob = await job.save();
      return res
        .status(201)
        .json({ message: `${jid} Updated successfully`, details: updatedJob });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `${jid} could not be Updated `, details: error });
  }
};

//delete a job
const deleteJob = async (req, res) => {
  const { id } = req.body;
  const response = await Job.deleteOne({ _id: id });
  if (!response)
    return res.status(500).json({ error: "Something Went Wrong!" });

  return res.status(200).json({ message: "Job Successfully Deleted" });
};

module.exports = {
  createNewJob,
  retrieveJobs,
  retrieveJobDetails,
  candidateApplicationForm,
  updateFavourite,
  deleteJob,
};
