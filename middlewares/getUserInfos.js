const { findUserByEmailService } = require("../services/user.service");

const getUserInfos = (...fields) => {
  return async(req, res, next) => {
    const selectedFields = fields.join(" ");
    const user = await findUserByEmailService(req.user.email, selectedFields);
    req.user = { ...req.user, ...user.toObject() };
    next();
  };
};
module.exports = getUserInfos;