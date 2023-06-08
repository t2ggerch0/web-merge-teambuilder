// express
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app",
      "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/class/guest",
      "http://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app/class/join-class",
      "https://localhost:3000",
      "http://localhost:3000",
    ],
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
mongoose.connect(process.env.MONGODB_URL);

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
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Socket.io
const socketio = require("socket.io");
const io = socketio(server);
const Team = require("./models/Team");

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle new client connection
  socket.on("joinTeamChat", (teamId) => {
    console.log("Client joined team chat:", teamId);
    socket.join(teamId); // Join the team-specific chat room
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("teamChatMessage", (data) => {
    const { teamId, sender, message } = data;
    console.log("Received team chat message:", data);

    // 채팅 인포 구조체
    const chatMessage = {
      sender,
      message,
      createdAt: new Date(),
    };

    // 팀채팅
    Team.findByIdAndUpdate(
      teamId,
      { $push: { chat: chatMessage } },
      { new: true },
      (err, updatedTeam) => {
        if (err) {
          console.error("Error saving chat message:", err);
          return;
        }

        // Broadcast the message to all clients in the team-specific chat room
        io.to(teamId).emit("teamChatMessage", chatMessage);
      }
    );
  });
});


///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// API ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

//======auth api======//
const checkEmail = require("./routes/auth/checkEmail");
const verify = require("./routes/auth/verify");
const login = require("./routes/auth/login");
const deleteUser = require("./routes/auth/deleteUser");
const getUsers = require("./routes/auth/getUsers");

//======class api======//
// get
const getClass = require("./routes/class/getClass");
const getHostClasses = require("./routes/class/getHostClasses");
const getGuestClasses = require("./routes/class/getGuestClasses");
const getAllClasses = require("./routes/class/getAllClasses");
// const getFormTeamWithOption = require("./routes/class/getFormTeamWithOption");

// post
const createClass = require("./routes/class/createClass");
const joinClass = require("./routes/class/joinClass");
const formTeam = require("./routes/class/formTeam");

//======question api======//
const getQuestions = require("./routes/question/getQuestions");

//======team api======//
const getTeam = require("./routes/team/getTeam");
const getClassTeams = require("./routes/team/getClassTeams");
const postMessage = require("./routes/team/postMessage");
const setTodo = require("./routes/team/setTodo");
const deleteTodo = require("./routes/team/deleteTodo");

//======global api======//
const createFeedback = require("./routes/global/createFeedback");


//======Signing API======//

app.use("/auth", checkEmail);
app.use("/auth", verify);
app.use("/auth", login);
app.use("/auth", deleteUser);
app.use("/auth", getUsers);

//======Class API======//

app.use("/class", createClass);
app.use("/class", joinClass);
app.use("/class", getClass);
app.use("/class", getHostClasses);
app.use("/class", getGuestClasses);
app.use("/class", getAllClasses);
app.use("/class", formTeam);
// app.use("/class", getFormTeamWithOption);

//======Question API======//
app.use("/question", getQuestions);

//======Team API ======//
app.use("/team", getTeam);
app.use("/team", getClassTeams);
app.use("/team", postMessage);
app.use("/team", setTodo);
app.use("/team", deleteTodo);

//======global api======//
app.use("/global", createFeedback);


module.exports = { app, server };
