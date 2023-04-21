const User = require("../models/User");

const VerifyUserType = async (userId, type) => {
  // verify user type
  const user = await User.findById(userId);
  if (user.userType !== type) {
    return res.status(403).json({ message: "Wrong user type" });
  }
};

module.exports = VerifyUserType;
