const {
  createJob,
  updateJob,
  getJobById,
  getAllJobs,
  applyJob,
  getMostAppliedJobs,
} = require("../controllers/job.controller");
const authorization = require("../middlewares/authorization");
const getUserInfos = require("../middlewares/getUserInfos");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router
  .route("/")
  .get(getAllJobs)
  .post(
    verifyJWT,
    authorization("hiring-manager"),
    getUserInfos("firstName", "lastName", "-_id"),
    createJob
  );
router.get('/mostApplied', getMostAppliedJobs)

router
  .route("/:id")
  .get(getJobById)
  .patch(verifyJWT, authorization("hiring-manager"), updateJob);

router.post(
  "/:id/apply",
  verifyJWT,
  authorization("candidate"),
  getUserInfos("firstName", "lastName", "-_id"),
  applyJob
);

module.exports = router;
