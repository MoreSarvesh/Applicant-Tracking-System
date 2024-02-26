const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const candidateDetailSchema = new Schema({
  label: String,
  value: String,
});

const candidateMarkSchema = new Schema({
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
  },
  marks: {
    type: Number,
    default: 0,
  },
});

const candidateSchema = new Schema(
  {
    appliedJob: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    status: {
      type: String,
      enum: ["APPLIED", "HIRED", "REJECTED"],
      default: "APPLIED",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    resumeScore: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      default: "",
    },
    details: [candidateDetailSchema],
    assessmentMarks: [candidateMarkSchema],
  },
  { timestamps: true }
);

const Candidate = model("Candidate", candidateSchema);

module.exports = { Candidate };
