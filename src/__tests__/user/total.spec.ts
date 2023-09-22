import supertest from "supertest";
import app from "../../app";
import { IUser } from "../../models/User";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const createUse = () => supertest(app).post("/api/v1/user").send(tmpUser);

describe("Todo REST API TEST", () => {
  test("Fetching total of todos", async () => {
    await createUse();

    const foundUserResponse = await supertest(app)
      .get("/api/v1/user/total")
      .expect(200);

    expect(foundUserResponse.body._data).toEqual(1);
  });
});
