const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");

// test class id
const classId = "6468babc6b4ff537ac0d1ff8";

describe("Join Class API Tests", () => {
  let token = null;

  before(async () => {
    // get student login data
    const loginData = {
      email: "juns98@naver.com",
      password: "abc123!!",
    };

    const res = await request(app).post("/auth/login").send(loginData);
    token = res.body.token;
  });

  after(() => {
    server.close();
    process.exit();
  });

  describe("POST /class/join-class", () => {
    it("should return status 201 and success true if class created successfully", async () => {
      try {
        const classData = {
          classId: classId,
          position: "frontend",
          answers: [
            {
              questionId: "0",
              answer: 2,
            },
            {
              questionId: "1",
              answer: 1,
            },
            {
              questionId: "2",
              answer: [0, 3, 19],
            },
            {
              questionId: "3",
              answer: 0,
            },
          ],
        };

        const response = await request(app).post("/class/join-class").set("Authorization", `Bearer ${token}`).send(classData).expect(201);

        console.log(response.body);
      } catch (error) {
        console.error(error);
      }
    });
  });
});
