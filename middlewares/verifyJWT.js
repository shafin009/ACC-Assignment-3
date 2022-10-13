const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({ error: "You are not logged in" });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid Token" })
  }
};
module.exports = verifyJWT;
