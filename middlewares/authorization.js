const authorization = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this" });
    }
    next();
  };
};
module.exports = authorization;
