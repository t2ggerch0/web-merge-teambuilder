const bcrypt = require("bcryptjs");
const User = require("../models/User");
// dotenv
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

const createUserWithoutVerify = async () => {
  try {
    // create random email
    const randomNumber = Math.floor(Math.random() * 100000 + 1);
    const email = "randuser" + randomNumber + "@" + "test.com";
    const password = "abc123!!";

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = -1;
    const name = "randuser" + randomNumber + "";

    const newUser = new User({
      email,
      password: hashedPassword,
      verifyCode,
      name,
    });

    await newUser.save();
    console.log("User saved");
    return { email, password };
  } catch (error) {
    console.error(error);
  }
};

createUserWithoutVerify();

module.exports = createUserWithoutVerify;
