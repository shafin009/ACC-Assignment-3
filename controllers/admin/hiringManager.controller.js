const {
  getCandidateDetailsByIdService,
} = require("../../services/admin/candidate.service");
const {
  getAllHiringManagersService,
  updateCandidateToHiringManagerService,
} = require("../../services/admin/hiringManager.service");
const generateError = require("../../utils/generateError");
const getPagination = require("../../utils/getPagination");

exports.getAllHiringManagers = async (req, res) => {
  try {
    const fields = req.query?.fields?.split(",").join(" ") || "";
    const pagination = getPagination(req.query?.page, req.query?.limit);
    const hiringManagers = await getAllHiringManagersService({
      fields,
      pagination,
    });
    return res.status(200).json({ hiringManagers });
  } catch (error) {
    res.status(400).json({
      error: generateError(error, "Can't get the candidates"),
    });
  }
};

exports.updateUserToHiringManager = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCandidateDetailsByIdService({
      id,
      fields: "role",
    });
    if(!user || user?.role !== "candidate") {
      return res
      .status(400)
      .json({ error: "Not a candidate!" });
    }
    const updated = await updateCandidateToHiringManagerService({ id });
    if (!updated.modifiedCount) {
      return res
        .status(400)
        .json({ error: "Can't Update" });
    }
    res
      .status(200)
      .json({ message: "User updated to hiring manager successfully" });
  } catch (error) {
    res.status(400).json({
      error: generateError(
        error,
        "Can't update the candidate to hiring manager",
        true
      ),
    });
  }
};
