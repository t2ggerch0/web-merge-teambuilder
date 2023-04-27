const User = require("../models/User");

const verifyUserType = async (userId, type) => {
  // verify user type
  const user = await User.findById(userId);
  if (user.userType !== type) {
    throw new Error("Wrong user type");
  }
  return user;
};

module.exports = verifyUserType;
