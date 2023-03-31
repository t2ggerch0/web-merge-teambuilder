//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// LIFE CYCLE /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


// express
const express = require("express");
const app = express();
const port = 1398;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

// router
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
app.use(router);

// encrypt
const bcrypt = require("bcryptjs");

// cors
const cors = require("cors");
app.use(cors());
router.use(cors());

// token
const jwt = require('jsonwebtoken');

// DB
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb+srv://root:1398@cluster0.4edtyez.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL);
const Class = require("./models/Class");
const Team = require("./models/Team");
const User = require("./models/User");

// swagger
const { swaggerUi, specs } = require('./swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// API ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


app.get("/", function (req, res) {
    res.send("root")
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - auth
 *     summary: 회원가입
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: application/json 타입으로 패킷 보내주시면 됩니다. userType은 반드시 professor 혹은 student 입니다.
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
 *     responses:
 *       200:
 *         description: 회원가입 성공
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
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/register', async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Check for duplicate emails
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ code: 0 });
        }

        // Encrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, userType });

        return res.status(200).json({ code: 1 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

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
 *         description: 로그인 정보
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
 *               description: 응답 코드
 *               example: 1
 *             token:
 *               type: string
 *               description: JWT 토큰
 *       401:
 *         description: 로그인 실패
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               description: 응답 코드
 *               example: 0
 *             message:
 *               type: string
 *               description: 에러 메시지
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ code: 0, message: '이메일이 존재하지 않습니다.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 0, message: '비밀번호가 일치하지 않습니다.' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret_key');

        return res.status(200).json({ code: 1, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
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
    }
})

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////