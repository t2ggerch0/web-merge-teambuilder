// express
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app",
      "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/class/guest",
      "http://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/class/join-class",
      "https://localhost:3000",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "*"
  })
);

// router
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
app.use(router);

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

// swagger
const { swaggerUi, specs } = require("./swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// path
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// API ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

//======auth api======//
const checkEmail = require("./routes/auth/checkEmail");
const verify = require("./routes/auth/verify");
const login = require("./routes/auth/login");
const deleteUser = require("./routes/auth/deleteUser");
const getUsers = require("./routes/auth/getUsers");

//======class api======//
// get
const getClass = require("./routes/class/getClass");
const getHostClasses = require("./routes/class/getHostClasses");
const getGuestClasses = require("./routes/class/getGuestClasses");
const getAllClasses = require("./routes/class/getAllClasses");

// post
const createClass = require("./routes/class/createClass");
const joinClass = require("./routes/class/joinClass");
const formTeam = require("./routes/class/formTeam");

//======question api======//
const getQuestions = require("./routes/question/getQuestions");

//======team api======//
const getTeam = require("./routes/team/getTeam");
const postMessage = require("./routes/team/postMessage");
//======Signing API======//

app.use("/auth", checkEmail);
app.use("/auth", verify);
app.use("/auth", login);
app.use("/auth", deleteUser);
app.use("/auth", getUsers);

//======Class API======//

app.use("/class", createClass);
app.use("/class", joinClass);
app.use("/class", getClass);
app.use("/class", cors(), getHostClasses);
app.use("/class", cors(), getGuestClasses);
app.use("/class", getAllClasses);
app.use("/class", formTeam);

//======Question API======//
app.use("/question", getQuestions);

//======Team API ======//
app.use("/team", getTeam);
app.use("/team", postMessage);

module.exports = { app, server };
