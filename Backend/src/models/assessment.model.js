const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assQuestionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
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
    required: true,
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
  answers: [String],
});

const Assessment = model("Assessment", assessmentSchema);

module.exports = { Assessment };
