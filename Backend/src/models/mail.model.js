const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const mailSchema = new Schema(
  {
    to: [String],
    cc: [String],
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Mail = model("Mail", mailSchema);

module.exports = { Mail };
