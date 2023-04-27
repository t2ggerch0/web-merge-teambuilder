const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");
const { exit } = require("process");

describe("Login API Tests", () => {
  // Test login endpoint
  describe("POST /auth/login", () => {
    it("should return status 200 if email and password are valid", (done) => {
      const loginData = {
        email: "juns98@g.skku.edu",
        password: "1234",
      };

      request(app)
        .post("/auth/login")
        .send(loginData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          console.log(res.body.token);
          // assert.strictEqual(res.body.success, true);
          assert.strictEqual(typeof res.body.token, "string");

          done();
        });
    });

    it("should return status 401 if email or password is invalid", (done) => {
      const loginData = {
        email: "test@example.com",
        password: "invalidpassword",
      };

      request(app).post("/auth/login").send(loginData).expect(401, done);
    });
  });
});

after(() => {
  // close connection to app
  server.close(() => {
    console.log("Closed Server");
    exit();
  });
});
