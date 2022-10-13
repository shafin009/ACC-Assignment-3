const Job = require("../models/Job");
const JobApply = require("../models/JobApply");

exports.getManagerJobsByIdService = async ({ id, fields, pagination }) => {
  const job = await Job.find({ "hiringManager.id": id })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields);
  return job;
};

exports.getAppliedCandidatesByJobId = async ({
  id,
  fields,
  getFullCandidateInfo = false,
}) => {
  const candidates = await JobApply.find({ job: id })
    .select(fields)
    .populate(getFullCandidateInfo ? "candidate.id" : "");
  return candidates;
};
