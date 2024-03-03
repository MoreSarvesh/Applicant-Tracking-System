const { Job } = require("../models/job.model.js");

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

module.exports = { createNewJob };
