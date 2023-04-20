const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     tags:
 *       - auth
 *     summary: 회원가입
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: default유저를 실제 유저로 덮어씁니다.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             userType:
 *               type: string
 *             verifyCode:
 *               type: number
 *             name:
 *               type: string
 *             studentId:
 *               type: number
 *             major:
 *               type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 1
 *       400:
 *         description: 인증코드 불일치
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: invalid verify code
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post("/verify", async (req, res) => {
  try {
    const { email, password, userType, verifyCode, name, studentId, major } = req.body;

    // Check verify code
    const defaultUser = await User.findOne({ email }, { verifyCode: 1 });
    if (!defaultUser || defaultUser.verifyCode !== verifyCode) {
      return res.status(400).json({ code: 0, message: "invalid verify code" });
    }

    // Update user.
    const hashedPassword = await bcrypt.hash(password, 10);
    defaultUser.password = hashedPassword;
    defaultUser.userType = userType;
    defaultUser.verifyCode = -1;
    defaultUser.name = name;
    defaultUser.studentId = studentId;
    defaultUser.major = major;
    await defaultUser.save();

    return res.status(200).json({ code: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
