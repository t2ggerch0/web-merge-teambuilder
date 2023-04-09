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
require("dotenv").config();

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

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// API ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const checkEmail = require("./routes/Sign/checkEmail");
const verify = require("./routes/Sign/verify");
const login = require("./routes/Sign/login");
const deleteUser = require("./routes/Sign/deleteUser");

const createClass = require("./routes/Class/createClass");

app.get("/", function (req, res) {
  res.send("root");
});

//======Signing API======//
app.use("/email", checkEmail);
app.use("/verify", verify);
app.use("/login", login);
app.use("/deleteUser", deleteUser);

//======Class API======//
app.use("/create-class", createClass);

app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = 1398;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//======Swagger======//
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
 *         description: 이미 등록된 사용자가 있음 혹은 학교 이메일이 아님
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: user already exists or not school email
 *       500:
 *         description: 서버 내부 오류 혹은 이메일 전송 실패
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error or Error sending verification code
 */

/**
 * @swagger
 * /verify:
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 로그인
 *     tags:
 *       - auth
 *     parameters:
 *       - in: body
 *         name: body
 *         description:
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 1
 *             token:
 *               type: string
 *             user:
 *               type: string
 *       401:
 *         description: 이메일 없음 혹은 비밀번호 불일치
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: email not found or password not matched
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     tags:
 *       - auth
 *     summary: 회원 탈퇴
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: path
 *         description: 삭제할 유저의 이메일
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User deleted successfully
 *       404:
 *         description: 유저가 존재하지 않음
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */

// test post Question
router.post("/add_question", async (req, res) => {
  try {
    const { classId, title, type, options } = req.body;

    // verify classId

    // create Question
    await Question.create({ classId, title, type, options });

    // return result
    return res.status(200).json({ code: 1 });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
