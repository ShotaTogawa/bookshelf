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

// avatar

test("should upload an avatar and gat the avatar", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const filePath = `${__dirname}/AI.jpeg`;
  await request(app)
    .post(`/api/user/avatar/${userOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .attach("avatar", filePath)
    .expect(200);
  const user = await User.findById({ _id: userOneId });
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should not upload an avatar", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const filePath = `${__dirname}/AI.jpeg`;
  await request(app)
    .post(`/api/user/avatar/${userOneId}`)
    // .set('Authorization', `Bearer ${res.body.token}`)
    .attach("avatar", filePath)
    .expect(401);
  const user = await User.findById({ _id: userOneId });
  expect(user.avatar).toEqual(null);
});
