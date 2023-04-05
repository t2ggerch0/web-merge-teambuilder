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

// xlsx
const XLSX = require('xlsx');

// nodemailer
const nodemailer = require('nodemailer');

// dotenv
require('dotenv').config();

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
mongoose.connect(process.env.MONGODB_URL);
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
router.post('/email', async (req, res) => {
    try {
        const { email } = req.body;

        // Check for duplicate emails
        const existingUser = await User.findOne({ email, verifyCode: 1 });
        if (existingUser && existingUser.verifyCode == -1) {
            return res.status(409).json({ code: 0, message: 'duplicated email' });
        }

        // Check vaild email.
        const workbook = XLSX.readFile('domain.xlsx');
        const sheetName = 'domain';
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);
        const domainList = rows
            .map(row => row['domain'])
            .filter(domain => domain && domain.trim() !== '');

        let isValid = false;
        const userDomain = email.split('@')[1];
        for (let index = 0; index < domainList.length; index++) {
            if (domainList[index].indexOf(userDomain) != -1) {
                isValid = true;
                break;
            }
        }
        if (!isValid) {
            return res.status(409).json({ code: 0, message: 'not school email' });
        }

        // Generate random code.
        const verifyCode = Math.floor(Math.random() * 1000000);

        // Update user verifycode if exist.
        if (!existingUser) {
            await User.create({ email, password: 'default', userType: 'default', verifyCode: verifyCode });
        } else {
            existingUser.verifyCode = verifyCode;
            await existingUser.save();
        }

        // Create smtp client.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is ${verifyCode}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending verification code' });
            } else {
                console.log('Verification code sent: ' + info.response);
                return res.status(200).json({ code: 1 });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


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
router.post('/verify', async (req, res) => {
    try {
        const { email, password, userType, verifyCode } = req.body;

        // Check verify code
        const userVerifyCode = await User.findOne({ email }, { verifyCode: 1 });
        if (!userVerifyCode || userVerifyCode.verifyCode !== verifyCode) {
            return res.status(400).json({ code: 0, message: 'invalid verify code' });
        }

        // Encrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, userType });

        // Update user.
        existingUser.password = password;
        existingUser.userType = userType;
        existingUser.code = -1;
        await existingUser.save();

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
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ code: 0, message: 'email not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 0, message: 'password not matched' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret_key');

        return res.status(200).json({ code: 1, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////