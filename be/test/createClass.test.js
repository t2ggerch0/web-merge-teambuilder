const request = require("supertest");
const assert = require("assert");
const { app, server } = require("../index");

describe("Create Class API Tests", () => {
  let token = null;

  before(async () => {
    // get professor login data
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

  describe("POST /class/create-class", () => {
    it("should return status 201 and success true if class created successfully", (done) => {
      const classData = {
        className: "testClass2",
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
