const Class = require("../models/Class");

const VerifyClassId = async (classId) => {
  // verify class Id
  const selectedClass = await Class.findById(classId);
  if (selectedClass === null) {
    return res.status(403).json({ message: "Class ID not found" });
  }
  return selectedClass;
};

module.exports = VerifyClassId;
