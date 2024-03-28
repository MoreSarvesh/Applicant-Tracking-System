const { Candidate } = require("../models/candidate.model.js");

const retrieveAllCandidates = async (req, res) => {
  const candiates = await Candidate.find({});
  if (!candiates)
    return res.status(500).json({ error: "Could not return candidates" });

  return res.status(200).json({
    message: "Successfully retrieved all Candidates",
    details: candiates,
  });
};

module.exports = retrieveAllCandidates;
