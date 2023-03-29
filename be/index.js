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

// cors
const cors = require("cors");
app.use(cors());

// DB
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb+srv://root:1398@cluster0.4edtyez.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL);
const Class = require("./models/Class");
const Team = require("./models/Team");
const User = require("./models/User");

// Swagger
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
 *  /user:
 *    get:
 *      tags:
 *      - user
 *      description: 유저를 생성합니다.
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: name
 *          required: true
 *          schema:
 *            type: string
 *            description: 유저 이름
 *      responses:
 *       200:
 *        description: 유저 생성 성공
 */
app.get("/user", function (req, res) {
    const name = req.query.name;

    const newUser = new User();
    newUser.email = "default";
    newUser.password = "default";
    newUser.userType = "student";
    newUser.name = name;

    newUser.save()
        .then((user) => {
            console.log(user);
            res.send(user);
        })
});


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HELPER ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////