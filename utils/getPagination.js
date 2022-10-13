const getPagination = (page, limit) => {
  const pagination = {
    skip: (Number(page || 1) - 1) * Number(limit || 10),
    limit: Number(limit || 10),
  };
  return pagination;
};

module.exports = getPagination;
