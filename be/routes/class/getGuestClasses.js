const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");
const verifyJwt = require("../../utils/verifyJwt");

router.get("/guest", verifyJwt, async (req, res) => {
  try {
    // Verify JWT
    const userId = req.userId;

    // get class IDs
    let user = await User.findById(userId);
    let classes = user.classes;
    // console.log(user.classes);
    // console.log(classes[0]);

    // Guest인 클래스 가져오기
    let guestClasses = [];
    for (let index = 0; index < classes.length; index++) {
      // console.log(classes[index].toString());
      let classId = classes[index].toString();
      let targetClass = await Class.findById(classId);
      if(targetClass ==null){
        continue;
      }
      if (userId != targetClass.host) {
        guestClasses.push(targetClass);
      }
    }

    res.status(201).json({ guestClasses: guestClasses });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
