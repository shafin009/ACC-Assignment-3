const JobApply = require("../../models/JobApply");
const User = require("../../models/User");

exports.getAllCandidatesService = async ({ fields = "", pagination = {} }) => {
  const candidates = await User.find({ role: "candidate" })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields);
  return candidates;
};

exports.getCandidateDetailsByIdService = async ({ id, fields = "" }) => {
  const candidate = await User.findOne({ _id: id, role: "candidate" }).select(
    fields
  );
  return candidate;
};

exports.getCandidateAppliedJobById = async ({
  id,
  fields = "",
  pagination = {},
}) => {
  const candidate = await JobApply.find({ "candidate.id": id })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields);
  return candidate;
};
