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
const addQuestion = require("./routes/class/addDefaultQuestions");

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
app.use("/class", addQuestion);

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

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The class to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             professorId:
 *               type: string
 *             matchingType:
 *               type: string
 *             customQuestions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   priority:
 *                     type: number
 *     responses:
 *       200:
 *         description: The created class
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             professor:
 *               type: string
 *             students:
 *               type: array
 *               items:
 *                 type: string
 *             teams:
 *               type: array
 *               items:
 *                 type: string
 *             matchingType:
 *               type: string
 *             customQuestions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   priority:
 *                     type: number
 *       401:
 *         description: Not authorized to create class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
