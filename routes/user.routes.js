const { signUp, login, getMe } = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", verifyJWT, getMe);

module.exports = router;
