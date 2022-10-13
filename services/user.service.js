const User = require("../models/User");

exports.findUserByEmailService = async (email, fields) => {
  return await User.findOne({ email }).select(fields || "");
};
exports.signUpService = async (user) => {
  return await User.create(user);
};
