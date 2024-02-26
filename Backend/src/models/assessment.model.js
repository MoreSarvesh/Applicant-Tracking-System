const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assQuestionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  answer: {
    type: String,
    required: true,
  },
});

const assessmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    default: 1,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [assQuestionsSchema],
});

const Assessment = model("Assessment", assessmentSchema);

module.exports = { Assessment };
