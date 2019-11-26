const request = require("supertest");
const app = require("../src/app");
const Memo = require("../src/models/memo");
const {
  setupDatabase,
  userOneId,
  userOne,
  bookOne,
  bookOneId,
  memoOne,
  memoOneId,
  memoTwo,
  memoTwoId
} = require("./fixtures/db");

const password = 123456;

beforeEach(setupDatabase);

test("get memos related to bookOne", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .get(`/api/books/${userOneId}/${bookOneId}/memo`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);
});

test("add memo to bookOne", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .post(`/api/books/${userOneId}/${bookOneId}/memo`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send({
      bookId: bookOneId,
      userId: userOneId,
      memo: "this is my memo"
    })
    .expect(201);

  const memo = await Memo.findById(response.body._id);
  expect(memo.bookId).toEqual(bookOneId);
  expect(memo.userId).toBe(response.body.userId);
  expect(memo._Id).toEqual(response.body._Id);
  expect(memo.memo).toEqual("this is my memo");
});

test("get a memo of bookOne", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .get(`/api/books/${userOneId}/${bookOneId}/memo/${memoOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);
});

test("update a memo of bookOne", async () => {});

test("delete a memo of bookOne", async () => {});
