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

// encrypt
const bcrypt = require("bcryptjs");

// cors
const cors = require("cors");
app.use(cors());
router.use(cors());

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
 *       - user
 *     summary: 회원가입합니다. application/json 타입으로 패킷 보내주시면 됩니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 이메일
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: 비밀번호
 *         in: body
 *         required: true
 *         type: string
 *       - name: userType
 *         description: 유저 유형. professor 혹은 student
 *         in: body
 *         required: true
 *         type: string
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
router.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userType = req.body.userType;

    // Add random numbers to hashing.
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        try {
            User.findOne({
                email: email
            }, (error, result) => {
                if (result) {
                    res.status(409).json({
                        code: 0
                    });
                } else {
                    User.insertOne({
                        email: email,
                        password: hash,
                        userType: userType
                    }, (error, result) => {
                        res.status(200).json({
                            code: 1
                        });
                    })
                }
            })
        } catch (err) {
            console.log('err: ' + err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    })
})


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////