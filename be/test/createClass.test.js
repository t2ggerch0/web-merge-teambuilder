const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");

describe("Create Class API Tests", () => {
  let token = null;

  before(async () => {
    // get token
    const loginData = {
      email: "juns98@g.skku.edu",
      password: "1234",
    };

    const res = await request(app).post("/auth/login").send(loginData);
    token = res.body.token;
  });

  after(() => {
    server.close();
  });

  describe("POST /class/create-class", () => {
    it("should return status 201 and success true if class created successfully", (done) => {
      const classData = {
        name: "testClss",
        capacity: 100,
        startDate: "2023-04-26",
        endDate: "2023-07-26",
      };

      request(app)
        .post("/class/create-class")
        .set("Authorization", `Bearer ${token}`)
        .send(classData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res._body);
          done();
        });
    });
  });
});
