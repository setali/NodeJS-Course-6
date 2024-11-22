import "../src/config/loadTestEnv";
import supertest from "supertest";
import { bootstrap } from "../src/app";
import { redisClient } from "../src/config/redis";
import { log, logger, mongoTransport } from "../src/utils/logger";
import User from "../src/models/user";
import Article from "../src/models/article";
import { Op } from "sequelize";

let token, request, article;

const fakeUser = {
  username: "ali",
  password: "123",
};

const fakeArticle = {
  title: "Article title",
  text: "Article text",
  image: "Article image",
};

beforeAll(async () => {
  const server = await bootstrap();
  request = supertest(server);

  await request.post("/register").send(fakeUser);

  await User.update(
    { role: "ADMIN" },
    { where: { username: fakeUser.username } }
  );

  const response = await request.post("/api/admin/login").send(fakeUser);

  token = response.body.accessToken;
});

afterAll(async () => {
  await User.destroy({ where: { username: fakeUser.username } });
  await Article.destroy({ where: { id: { [Op.gt]: 0 } } });

  redisClient.disconnect();

  logger.clear();
  logger.remove(mongoTransport);
});

describe("admin article api", () => {
  test("list article 401", async () => {
    const response = await request.get("/api/admin/article");
    expect(response.statusCode).toBe(401);
  });

  test("list article 200", async () => {
    const response = await request
      .get("/api/admin/article")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test("create article", async () => {
    const response = await request
      .post("/api/admin/article")
      .set("Authorization", `Bearer ${token}`)
      .send(fakeArticle);
    expect(response.statusCode).toBe(200);

    article = response.body;
    checkArticle(article);
  });

  test("get article", async () => {
    const response = await request
      .get("/api/admin/article/" + article.id)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);

    checkArticle(response.body);
  });

  test("update article", async () => {
    const response = await request
      .put("/api/admin/article/" + article.id)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...article, title: "New Title", text: "New Text" });
    expect(response.statusCode).toBe(201);

    expect(response.body.title).toBe("New Title");
    expect(response.body.text).toBe("New Text");
    expect(response.body.id).toBe(article.id);
  });

  test("delete article", async () => {
    const response = await request
      .delete("/api/admin/article/" + article.id)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test("get deleted article", async () => {
    const response = await request
      .get("/api/admin/article/" + article.id)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});

function checkArticle(article) {
  expect(article.title).toBe(fakeArticle.title);
  expect(article.text).toBe(fakeArticle.text);
  expect(article.image).toBe(fakeArticle.image);
  expect(article).toHaveProperty("id");
}
