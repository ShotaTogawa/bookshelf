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

  expect(response.body.name).toBe(bookOne.name);
  expect(response.body.purchased_price).toBe(bookOne.purchased_price);
});

test("delete a book", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .delete(`/api/books/${userOneId}/${bookOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send()
    .expect(200);

  const book = Book.findById(bookOneId);
  expect(book).toBeUndefined;
});

test("update a book", async () => {
  const res = await request(app)
    .post("/api/signin")
    .send({
      email: "mike@test.com",
      password
    });

  const response = await request(app)
    .put(`/api/books/${userOneId}/${bookOneId}`)
    .set("Authorization", `Bearer ${res.body.token}`)
    .send({
      name: "book one updated",
      purchased_price: 100,
      read_pages: 140,
      status: "reading"
    })
    .expect(200);

  const book = await Book.findById(bookOneId);
  expect(book.name).toBe("book one updated");
  expect(book.purchased_price).toBe(100);
  expect(book.read_pages).toBe(140);
  expect(book.status).toBe("reading");
});
