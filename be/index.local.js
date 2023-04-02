//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// LIFE CYCLE /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// express
const express = require("express");
const app = express();
const port = 1398;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// router
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
app.use(router);

// encrypt
const bcrypt = require("bcryptjs");

// cors
const cors = require("cors");
app.use(cors());
router.use(cors());

// token
const jwt = require("jsonwebtoken");

// DB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/myapp", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

const Class = require("./models/Class");
const Team = require("./models/Team");
const User = require("./models/User");
const Question = require("./models/Question");

// swagger
const { swaggerUi, specs } = require("./swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/////////////////////////////////////// API ///////////////////////////////////////

app.get("/", function (req, res) {
  res.send("root");
});

// test post Question
router.post("/add_question", async (req, res) => {
  try {
    const { classId, title, type, options } = req.body;

    // verify classId

    // create Question
    await Question.create({ classId, title, type, options });

    // return result
    return res.status(200).json({ code: 1 });
  } catch {}
});

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
