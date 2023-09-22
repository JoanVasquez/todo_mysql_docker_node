import supertest from "supertest";
import app from "./app";

test("Testing 404", async () => {
  return supertest(app).get("/api/test").expect(404);
});
