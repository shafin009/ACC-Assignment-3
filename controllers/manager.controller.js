const { getJobByIdService } = require("../services/job.service");
const {
  getManagerJobsByIdService,
  getAppliedCandidatesByJobId,
} = require("../services/manager.service");
const generateError = require("../utils/generateError");
const getPagination = require("../utils/getPagination");

exports.getManagerJobsById = async (req, res) => {
  try {
    const { _id } = req.user;
    const fields =
      req.query?.fields?.split(",")?.join(" ") ||
      "-hiringManager -responsibilities -additionalRequirements -benefits -createdAt -updatedAt";
    const pagination = getPagination(req.query?.page, req.query?.limit);
    const jobs = await getManagerJobsByIdService({
      id: _id,
      fields,
      pagination,
    });
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(400).json({
      error: generateError(error, "Can't get jobs of this manager"),
    });
  }
};

exports.getJobDetailsByIdManager = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user._id;
    const fields = req.query?.fields?.split(",")?.join(" ") || "";
    const candidatesFields =
      req.query?.candidatesFields?.split(",")?.join(" ") || "";
    // to get the full info you need to pass ?getFullInfo=1 in the url
    const getFullInfo = Number(req.query?.getFullInfo || 0);
    const jobHiringManager = await getJobByIdService(id, "hiringManager -_id");
    if (jobHiringManager?.hiringManager?.id.toString() !== managerId) {
      return res
        .status(400)
        .json({ error: "This job is not created by you" });
    }
    const job = await getJobByIdService(id, fields);
    const appliedCandidates = await getAppliedCandidatesByJobId({
      id,
      fields: candidatesFields,
      getFullCandidateInfo: getFullInfo === 1 ? true : false,
    });
    return res.status(200).json({
      job,
      appliedCandidates,
    });
  } catch (error) {
    return res.status(400).json({
      error: generateError(error, "Can't get this job of this manager", true),
    });
  }
};
