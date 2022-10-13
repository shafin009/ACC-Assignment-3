const {
  getAllHiringManagers,
  updateUserToHiringManager
} = require("../../controllers/admin/hiringManager.controller");
const authorization = require("../../middlewares/authorization");
const verifyJWT = require("../../middlewares/verifyJWT");

const router = require("express").Router();

router.get("/", verifyJWT, authorization("admin"), getAllHiringManagers);

router.get(
  "/update/:id",
  verifyJWT,
  authorization("admin"),
  updateUserToHiringManager
);

module.exports = router;
