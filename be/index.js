//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// LIFE CYCLE /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// express
const express = require("express");
const app = express();

// router
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "*",
    credentials: false,
  })
);
router.use(cors());

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

// swagger
const { swaggerUi, specs } = require("./swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(router);

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// API ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const checkEmail = require("./routes/auth/checkEmail");
const verify = require("./routes/auth/verify");
const login = require("./routes/auth/login");
const deleteUser = require("./routes/auth/deleteUser");
const getUsers = require("./routes/auth/getUsers");

const createClass = require("./routes/class/createClass");
const addDefaultQuestions = require("./routes/class/addDefaultQuestions");
const addCustomQuestions = require("./routes/class/addCustomQuestions");
const joinClass = require("./routes/class/joinClass");

const createQuestion = require("./routes/question/createQuestion");

app.get("/", function (req, res) {
  res.send("root");
});

//======Signing API======//
app.use("/auth", checkEmail);
app.use("/auth", verify);
app.use("/auth", login);
app.use("/auth", deleteUser);
app.use("/auth", getUsers);

//======Class API======//
app.use("/class", createClass);
app.use("/class", addDefaultQuestions);
app.use("/class", addCustomQuestions);
app.use("/class", joinClass);

//======Question API======//
app.use("/question", createQuestion);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = 1398;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
