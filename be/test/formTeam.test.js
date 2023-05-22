const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");
const createMultipleUsers = require("./createMultipleUsers");
const Class = require("../models/Class");
const User = require("../models/User");

const userCount = 20;
let userList = [];
let classId = null;

describe("Form team  API Tests", () => {
  let token = null;

  before(async function () {
    this.timeout(0);

    async function setup() {
      // get host login data
      const loginData = {
        email: "juns98@naver.com",
        password: "abc123!!",
      };

      const res = await request(app).post("/auth/login").send(loginData);
      token = res.body.token;

      console.log("login success");

      // host create class
      const classData = {
        className: "testClass" + Math.floor(Math.random() * 100000 + 1),
        classType: "web",
        classDescription: "test create class",
        positionTypes: ["frontend", "backend"],
        positionComposition: [2, 2],
        hostPosition: "frontend",
        recruitStartDate: "2021-05-01",
        recruitEndDate: "2021-05-10",
        activityStartDate: "2021-05-11",
        activityEndDate: "2021-06-11",
        isSecret: false,
        isHostParticipating: true,
        questionIds: [0, 1, 2, 3],
        hostAnswer: [0, 1, [2, 5], 3],
      };

      const createClassResponse = await request(app).post("/class/create-class").set("Authorization", `Bearer ${token}`).send(classData).expect(201);
      console.log("create Class success");

      // save class

      // get class id
      classId = createClassResponse.body.classId;

      // random users join class
      let users = await createMultipleUsers(userCount);
      userList = users;

      // join class with random answer
      for (let i = 0; i < userCount; i++) {
        // login
        const loginData = {
          email: users[i].email,
          password: users[i].password,
        };
        const res = await request(app).post("/auth/login").send(loginData);
        const token = res.body.token;
        console.log("login success");

        // join class with random answer
        // q1 answers: 0, 1, 2, 3, 4
        // q2 answers: 0, 1, 2, 3, 4
        // q3 answers: 0~20 multiple
        // q4 answers: 0, 1

        let positionList = ["frontend", "backend"];

        // random num of answers for q3 (max 10)
        let numOfAnswers = Math.floor(Math.random() * 4) + 1;

        // random answers for q3
        let answers = [];
        for (let j = 0; j < numOfAnswers; j++) {
          // answer should be unique
          let answer = Math.floor(Math.random() * 20 + 1);
          while (answers.includes(answer)) {
            answer = Math.floor(Math.random() * 20 + 1);
          }
          answers.push(answer);
        }

        console.log(answers);

        // input random answers
        try {
          const joinClassData = {
            classId: classId,
            position: positionList[Math.floor(Math.random() * 2)],
            answers: [
              {
                questionId: "0",
                answer: Math.floor(Math.random() * 5),
              },
              {
                questionId: "1",
                answer: Math.floor(Math.random() * 5),
              },
              {
                questionId: "2",
                answer: answers,
              },
              {
                questionId: "3",
                answer: Math.floor(Math.random() * 2),
              },
            ],
          };

          await request(app).post("/class/join-class").set("Authorization", `Bearer ${token}`).send(joinClassData).expect(201);
          console.log("user " + i + " join class success");
        } catch (error) {
          console.log(error);
        }
      }

      console.log("join class success");
      // get class
      let currentClass = await Class.findById(classId);
      console.log(currentClass);
    }

    await setup().catch((error) => {
      console.error(error);
    });
  });

  after(async function () {
    console.log("Closing server");
    server.close();
    process.exit();
  });

  describe("POST /class/form-team", () => {
    it("should return status 201", async function (done) {
      console.log("forming success");

      try {
        const data = {
          classId: classId,
        };

        const response = await request(app).post("/class/form-team").set("Authorization", `Bearer ${token}`).send(data).expect(201);
        console.log(response.body);
      } catch (error) {
        console.error(error);
      }
      done();
    });
  });
});
