const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

const name = "test";
const email = "test@test.com";
const password = "123456";
const badEmail = "testtest.com";
const badName = "a";

test("should signup a user", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      name,
      email,
      password
    })
    .expect(201);
  expect(response.token).not.toBeNull();

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name,
      email
    }
  });

  expect(user.hashed_password).not.toBe(password);
});

test("should not signup a user", async () => {
  await request(app)
    .post("/api/signup")
    .send({
      name: badName,
      email,
      password
    })
    .expect(400);

  await request(app)
    .post("/api/signup")
    .send({
      name,
      email: badEmail,
      password
    })
    .expect(400);
});

test("should signin a user", async () => {
  const response = await request(app)
    .post("/api/signin")
    .send({ email, password })
    .expect(201);

  expect(response.token).not.toBeNull();
});

test("should not signin a user", async () => {});

test("should signout a user", async () => {});

test("a user should be authenticated", async () => {});

test("a user should not be authenticated", async () => {});
