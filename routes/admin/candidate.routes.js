const {
  getAllCandidates, getCandidateDetailsById,
} = require("../../controllers/admin/candidate.controller");
const authorization = require("../../middlewares/authorization");
const verifyJWT = require("../../middlewares/verifyJWT");

const router = require("express").Router();

router.get("/", verifyJWT, authorization("admin"), getAllCandidates);
router.get("/:id", verifyJWT, authorization("admin"), getCandidateDetailsById);

module.exports = router;
