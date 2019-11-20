const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { setupDatabase, userOneId, userOne } = require("./fixtures/db");

const password = "123456";

beforeEach(setupDatabase);

test("get a user info", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .get(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);

  expect(response.body.email).toBe(userOne.email);
  expect(response.body.name).toBe(userOne.name);
});

test("update a user info", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .put(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send({
      email: "updatede-mail@test.com",
      name: "updatedName"
    })
    .expect(200);

  expect(response.body.email).toBe("updatede-mail@test.com");
  expect(response.body.name).toBe("updatedName");
});

test("delete a user", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "updated-mail@test.com",
      password
    });

  const response = request(app)
    .delete(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);

  const user = User.findById(userOneId);
  expect(user).toBeUndefined;
});
