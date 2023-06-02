const Class = require("../models/Class");

const verifyClassId = async (classId, res) => {
  try {
    // verify class Id
    const selectedClass = await Class.findById(classId);
    if (selectedClass === null) {
      return res.status(403).json({ message: "Class ID not found" });
    }
    return selectedClass;
  } catch (error) {
    // 에러 처리
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyClassId;