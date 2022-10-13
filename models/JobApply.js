const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Types;
const jobApplySchema = mongoose.Schema({
  job: {
    type: ObjectId,
    required: true,
    ref: "Job",
  },
  candidate: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  coverLetter: {
    type: String,
    required: [true, "Cover letter is required"],
  },
  resumeLink: {
    type: String,
    validate: [validator.isURL, "Valid url is required"],
  },
  applyDate: {
    type: Date,
    default: Date.now,
  },
});

const JobApply = mongoose.model("JobApply", jobApplySchema);
module.exports = JobApply;
