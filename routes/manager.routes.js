const { getManagerJobsById, getJobDetailsByIdManager } = require("../controllers/manager.controller");
const authorization = require("../middlewares/authorization");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.get(
  "/jobs",
  verifyJWT,
  authorization("hiring-manager"),
  getManagerJobsById
);

router.get(
  "/jobs/:id",
  verifyJWT,
  authorization("hiring-manager"),
  getJobDetailsByIdManager
);

module.exports = router;
