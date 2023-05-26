const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");

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