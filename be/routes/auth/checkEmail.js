const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");

/**
 * @swagger
 * /email:
 *   post:
 *     tags:
 *       - auth
 *     summary: 인증코드 생성 및 이메일 전송
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: default 유저를 생성합니다.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: 인증코드 전송 성공
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 1
 *       409:
 *         description: 이미 등록된 사용자가 있음
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: user already exists
 *       500:
 *         description: 서버 내부 오류 혹은 이메일 전송 실패
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error or Error sending verification code
 */
router.post("/email", async (req, res) => {
  try {
    const { email } = req.body;

    // Check for duplicate emails
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.verifyCode == -1) {
      return res.status(409).json({ code: 0, message: "duplicated email" });
    }

    // Check vaild email.
    // const workbook = XLSX.readFile("domain.xlsx");
    // const sheetName = "domain";
    // const worksheet = workbook.Sheets[sheetName];
    // const rows = XLSX.utils.sheet_to_json(worksheet);
    // const domainList = rows.map((row) => row["domain"]).filter((domain) => domain && domain.trim() !== "");

    // let isValid = false;
    // const userDomain = email.split("@")[1];
    // for (let index = 0; index < domainList.length; index++) {
    //   if (domainList[index].indexOf(userDomain) != -1) {
    //     isValid = true;
    //     break;
    //   }
    // }
    // if (!isValid) {
    //   return res.status(409).json({ code: 0, message: "not school email" });
    // }

    // Generate random code.
    const verifyCode = Math.floor(Math.random() * 1000000);

    // Update user verifycode if exist.
    if (!existingUser) {
      await User.create({ email, password: "default", userType: "default", verifyCode: verifyCode });
    } else {
      existingUser.verifyCode = verifyCode;
      await existingUser.save();
    }

    // Create smtp client.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${verifyCode}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending verification code" });
      } else {
        console.log("Verification code sent: " + info.response);
        return res.status(200).json({ code: 1 });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;