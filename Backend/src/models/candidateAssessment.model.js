const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const candidateAssessmentSchema = new Schema(
  {
    assessment_id: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    candidate_id: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Candidateassessment = model(
  "Candidateassessment",
  candidateAssessmentSchema
);

module.exports = { Candidateassessment };
