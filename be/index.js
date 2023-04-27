// express
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: ['https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app'
    ,'http://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/class/join-class'
    ,'https://localhost:3000'
    , 'http://localhost:3000'],
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

// path
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

const port = 3000;
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
const joinClass = require("./routes/class/joinClass");
const addDefaultQuestions = require("./routes/class/addDefaultQuestions");
const addCustomQuestions = require("./routes/class/addCustomQuestions");
const getClass = require("./routes/class/getClass");
const endAddingQuestion = require("./routes/class/endAddingQuestion");
const endAddingAnswer = require("./routes/class/endAddingAnswer");
const submitAnswers = require("./routes/class/submitAnswers");

const createQuestion = require("./routes/question/createQuestion");
const getQuestion = require("./routes/question/getQuestion");
const getQuestionList = require("./routes/question/getQuestionList");


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
 *     summary: 클래스를 생성하고 유일한 accessKey를 반환합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: The class to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             capacity:
 *               type: integer
 *             startDate:
 *               type: string
 *               format: date
 *             endDate:
 *               type: string
 *               format: date
 *     responses:
 *       201:
 *         description: Class created successfully
 *         schema:
 *           type: object
 *           properties:
 *             accessKey:
 *               type: number
 *             classId:
 *               type: string
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
 *     summary: accessKey로 클래스에 입장합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: accessKey
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessKey:
 *               type: number
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

/**
 * @swagger
 * /class/add-default-questions:
 *   post:
 *     summary: classId로 클래스를 찾고, default question을 추가합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: Class ID and question information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *             questionIndexes:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [0,1,2,3,4]
 *             weights:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [3,3,3,4,5]
 *             countScores:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["same","same","same","same","same"]
 *     responses:
 *       201:
 *         description: Successfully added questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Question Successfully
 *       403:
 *         description: Error adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can add questions or Class ID not found or Length of questionIndex, weight, and countScores are not same
 *       500:
 *         description: An error occurred while adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while creating the class
 */
app.use("/class", addDefaultQuestions);

/**
 * @swagger
 * /class/add-custom-questions:
 *   post:
 *     summary: 클래스ID로 클래스를 찾고, custom question을 추가합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: Class ID and question information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *             questions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                     example: custom
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isMandatory:
 *                     type: boolean
 *                   weight:
 *                     type: integer
 *                   scoringType:
 *                     type: string
 *                     enum: [single, multi, points]
 *                   countScore:
 *                     type: string
 *                     enum: [same, different]
 *     responses:
 *       201:
 *         description: Successfully added questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Question Successfully
 *       403:
 *         description: Error adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can add questions or Class ID not found
 *       500:
 *         description: An error occurred while adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while creating the class
 */
app.use("/class", addCustomQuestions);

/**
 * @swagger
 * /class:
 *   get:
 *     tags:
 *       - class
 *     summary: 클래스 정보
 *     description: 클래스ID로 클래스 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Class information retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
app.use("/class", getClass);

/**
 * @swagger
 * /class/end-question:
 *   post:
 *     tags:
 *       - class
 *     summary: 질문 추가 시퀀스를 끝냅니다
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: classId
 *         in: body
 *         description: The ID of the class to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *     responses:
 *       201:
 *         description: EndQuestion flag set successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Question Successfully
 *       403:
 *         description: User is not professor of class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not professor of class
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Server Error
 */
app.use("/class", endAddingQuestion);

/**
 * @swagger
 * /class/end-answer:
 *   post:
 *     tags:
 *       - class
 *     summary: 답변 시퀀스를 끝냅니다
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: classId
 *         in: body
 *         description: The ID of the class to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *     responses:
 *       201:
 *         description: EndAnswer flag set successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Answer Successfully
 *       403:
 *         description: User is not professor of class or student length doesn't match answer length
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not professor of class or student length doesn't match answer length
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Server Error
 */
app.use("/class", endAddingAnswer);

/**
 * @swagger
 * /class/submit-answers:
 *   post:
 *     tags:
 *       - class
 *     summary: 학생의 회원가입 시, Answers을 제출합니다.
 *     description: 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: classId
 *         in: body
 *         description: questionId키의 밸류는 해당 question의 answer 리스트입니다.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *             questionIds:
 *               type: array
 *               items:
 *                 type: string
 *             questionId:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answers submitted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Answers submitted successfully
 *       400:
 *         description: Invalid request body or missing required parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid request body or missing required parameters
 *       401:
 *         description: User is not authorized to submit answers
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not authorized to submit answers
 *       403:
 *         description: Question is not ended or question length is not equal
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Question is not ended or question length is not equal
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occured while submitting answers
 */
app.use("/class", submitAnswers);

//======Question API======//
app.use("/question", createQuestion);

/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - question
 *     summary: 질문 정보
 *     description: 질문ID로 질문 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Question information retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
app.use("/question", getQuestion);

/**
 * @swagger
 * /question/list:
 *   get:
 *     tags:
 *       - question
 *     summary: 클래스별 질문 리스트
 *     description: 클래스 ID로 해당 클래스에 등록된 모든 질문 리스트를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Question list retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             questions:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Question'
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
app.use("/question", getQuestionList);