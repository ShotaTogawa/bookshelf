const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

test("should signup a user", async () => {
  const response = await request(app)
    .post("/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "123456"
    })
    .expect(201);
});

test("should not signup a user", async () => {});

test("should signin a user", async () => {});

test("should not signin a user", async () => {});

test("should signout a user", async () => {});

test("a user should be authenticated", async () => {});

test("a user should not be authenticated", async () => {});
