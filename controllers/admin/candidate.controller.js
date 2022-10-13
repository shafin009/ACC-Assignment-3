const {
  getAllCandidatesService,
  getCandidateDetailsByIdService,
  getCandidateAppliedJobById,
} = require("../../services/admin/candidate.service");
const generateError = require("../../utils/generateError");
const getPagination = require("../../utils/getPagination");

exports.getAllCandidates = async (req, res) => {
  try {
    const fields = req.query?.fields?.split(",").join(" ") || "";
    const pagination = getPagination(req.query?.page, req.query?.limit);
    const candidates = await getAllCandidatesService({ fields, pagination });
    return res.status(200).json({ candidates });
  } catch (error) {
    res.status(400).json({
      error: generateError(error, "Can't get the candidates"),
    });
  }
};

exports.getCandidateDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.query?.fields?.split(",").join(" ") || "";
    const candidate = await getCandidateDetailsByIdService({
      id,
      fields,
    });

    const appliedJobsFields =
      req.query?.appliedJobsFields?.split(",").join(" ") || "-candidate";
    const pagination = getPagination(req.query?.page, req.query?.limit);
    const appliedJobs = await getCandidateAppliedJobById({
      id,
      pagination,
      fields: appliedJobsFields,
    });
    return res.status(200).json({ candidate, appliedJobs });
  } catch (error) {
    res.status(400).json({
      error: generateError(error, "", true),
    });
  }
};
