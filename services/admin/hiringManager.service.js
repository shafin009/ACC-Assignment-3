const User = require("../../models/User");

exports.getAllHiringManagersService = async ({
  fields = "",
  pagination = {},
}) => {
  const hiringManagers = await User.find({ role: "hiring-manager" })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields);
  return hiringManagers;
};

exports.updateCandidateToHiringManagerService = async ({ id }) => {
  return await User.updateOne(
    { _id: id, role: "candidate" },
    { role: "hiring-manager" }
  );
};
