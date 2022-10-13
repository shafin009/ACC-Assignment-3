const Job = require("../models/Job");
const JobApply = require("../models/JobApply");

exports.getAllJobsService = async ({
  filters = {},
  pagination = {},
  sort = "",
  fields = "",
}) => {
  let filtersObj = {
    location: { $regex: filters.location, $options: "i" },
  };
  if (!(filters.jobTypes.length === 0)) {
    filtersObj.jobTypes = { $in: filters.jobTypes };
  }
  if (filters.salaryRange.min) {
    filtersObj["salary.minSalary"] = { $gte: filters.salaryRange.min };
  }
  if (filters.salaryRange.max) {
    filtersObj["salary.maxSalary"] = { $lte: filters.salaryRange.max };
  }
  const jobs = await Job.find(filtersObj)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields)
    .sort(sort);
  return jobs;
};

exports.createJobService = async (data) => {
  const job = await Job.create(data);
  return job;
};

exports.getJobByIdService = async (id, fields = "", populate) => {
  const job = await Job.findById(id).select(fields).populate(populate);
  return job;
};

exports.updateJobService = async (id, data) => {
  const job = await Job.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return job;
};

exports.applyJobService = async (payload) => {
  const data = await JobApply.create(payload);
  await Job.updateOne({ _id: payload.job }, { $inc: { appliedCount: 1 } });
  return data;
};

exports.findJobByIdAndCandidateService = async (jobId, candidateId) => {
  return await JobApply.findOne({ job: jobId, "candidate.id": candidateId });
};

exports.getMostAppliedJobsService = async () => {
  return await Job.find({}).limit(5).sort("-appliedCount");
};
