const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const User = require("../models/User");
const Class = require("../models/Class");
const Team = require("../models/Team");

const deleteRandomUsers = async () => {
  try {
    const deletionResult = await User.deleteMany({ name: { $regex: "randuser" } });
    console.log("Deleted " + deletionResult.deletedCount + " users");
  } catch (error) {
    console.error("An error occurred while deleting users:", error);
  }
};

const deleteRandomClasses = async () => {
  try {
    const deletionResult = await Class.deleteMany({ className: { $regex: "testClass" } });
    console.log("Deleted " + deletionResult.deletedCount + " classes");
  } catch (error) {
    console.error("An error occurred while deleting classes:", error);
  }
};

const deleteRandomTeams = async () => {
  try {
    const deletionResult = await Team.deleteMany({ name: { $regex: "Team" } });
    console.log("Deleted " + deletionResult.deletedCount + " teams");
  } catch (error) {
    console.error("An error occurred while deleting teams:", error);
  }
};

//========Main========//
async function main() {
  await deleteRandomUsers();
  await deleteRandomClasses();
  await deleteRandomTeams();
  process.exit();
}
main();
