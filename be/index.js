// express
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: ['https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app', 'http://localhost:3000'],
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
mongoose.connect(process.env.MONGODB_URL, { bufferCommands: false });

// swagger
const { swaggerUi, specs } = require("./swagger");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = 1398;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

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

/**
 * @swagger
 * /auth/email:
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
app.use("/auth", checkEmail);


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
app.use("/auth", verify);


/**
 * @swagger
 * /auth/login:
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
app.use("/auth", login);


/**
 * @swagger
 * /auth/user:
 *   delete:
 *     tags:
 *       - auth
 *     summary: 회원 탈퇴
 *     parameters:
 *       - name: email
 *         in: query
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
app.use("/auth", deleteUser);


/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags:
 *       - auth
 *     summary: 유저 정보
 *     description: 토큰을 받고 유저 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Authorization header missing or Invalid token
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
app.use("/auth", getUsers);

//======Class API======//

/**
 * @swagger
 * /class/create-class:
 *   post:
 *     summary: 클래스를 생성하고 클래스ID를 반환합니다.
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
 *             capacity:
 *               type: integer
 *             startDate:
 *               type: date
 *             endDate:
 *               type: date
 *     responses:
 *       201:
 *         description: Class created successfully
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: number
 *             message:
 *               type: string
 *               example: Class created successfully
 *       403:
 *         description: Only professors can create a class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can create a class
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
app.use("/class", createClass);

/**
 * @swagger
 * /class/join-class:
 *   post:
 *     summary: 클래스ID로 클래스에 입장합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 클래스ID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: integer
 *     responses:
 *       201:
 *         description: joined class successfully
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: number
 *             message:
 *               type: string
 *               example: joined class successfully
 *       500:
 *         description: An error occurred while joining the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while joining the class
 */
app.use("/class", joinClass);
app.use("/class", addDefaultQuestions);
app.use("/class", addCustomQuestions);

//======Question API======//
app.use("/question", createQuestion);