const request = require("supertest");
const app = require("../src/app");
const Book = require("../src/models/book");
const {
  setupDatabase,
  userOneId,
  userOne,
  bookOne,
  bookOneId
} = require("./fixtures/db");

const password = "123456";
beforeEach(setupDatabase);

test("register a book", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .post(`/api/books/${userOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send({
      name: "test book",
      genre: "action",
      author: "Mr. action",
      page_nums: "280",
      purchased_price: "150",
      userId: userOneId
    })
    .expect(201);

  const book = await Book.findById({ _id: response.body._id });

  expect(book.name).toBe("test book");
  expect(book.genre).toBe("action");
  expect(book.author).toBe("Mr. action");
  expect(book.page_nums).toBe(280);
  expect(book.purchased_price).toBe(150);
  expect(book.genre).toBe("action");
  expect(book.read_pages).toBe(0);
  expect(book.status).toBe("beforeReading");
  expect(book.evaluation).toBe(0);
  expect(book.userId).toEqual(userOneId);
});

test("get a book", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .get(`/api/books/${userOneId}/${bookOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);

  // expect(response.body.email).toBe(userOne.email);
  // expect(response.body.name).toBe(userOne.name);
});
