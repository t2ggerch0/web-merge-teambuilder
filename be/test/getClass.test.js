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

    // get host login data
    const loginData = {
      email: "juns98@naver.com",
      password: "abc123!!",
    };

    const res = await request(app).post("/auth/login").send(loginData);
    token = res.body.token;

    console.log("login success");
  });

  after(async function () {
    console.log("Closing server");
    server.close();
    process.exit();
  });

  describe("GET /class/host", () => {
    it("should return status 201", async function (done) {
      try {
        const data = {
          classId: classId,
        };

        const response = await request(app).get("/class/guest").set("Authorization", `Bearer ${token}`).send(data).expect(201);
        console.log(response.body);
      } catch (error) {
        console.error(error);
      }
      done();
    });
  });
});
