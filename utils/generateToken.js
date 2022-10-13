const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const data = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};
module.exports = generateToken;