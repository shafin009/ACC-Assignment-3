const generateError = (error, customText, log = false) => {
  try {
    if (!error) {
      return "Something wen't wrong";
    }
    log && console.log(error);
    if (error?.errors) {
      const dbError = Object.values(error?.errors)[0]?.message;
      if (dbError) {
        return dbError;
      }
    }
    return customText || "Something wen't wrong";
  } catch (error) {
    log && console.log(error);
    return customText || "Something wen't wrong";
  }
};

module.exports = generateError;
