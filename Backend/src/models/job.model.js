const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const applicationFormSchema = new Schema({
  inputType: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: [String],
});

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openings: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSE"],
      default: "OPEN",
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    applicationForm: [applicationFormSchema],
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);

module.exports = { Job };
