const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");
const createMultipleUsers = require("./createMultipleUsers");
const Class = require("../models/Class");
const User = require("../models/User");

let classId = "646f86ef57809c5c81e1b6ab";

describe("Form team  API Tests", () => {
  let token = null;

  before(async function () {
    this.timeout(0);

    // get host login data
    const loginData = {
      email: "chomyungha@g.skku.edu",
      password: "abcd1234!!",
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

  describe("GET /team", () => {
    it("should return status 201", async function (done) {
      try {
        const data = {
          classId: classId,
        };
        console.log(data);
        const response = await request(app).get("/team").set("Authorization", `Bearer ${token}`).query(data).expect(201);
        console.log(response.body);
      } catch (error) {
        console.error(error);
      }
      done();
    });
  });
});
