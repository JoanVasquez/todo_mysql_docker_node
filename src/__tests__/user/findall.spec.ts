import supertest from "supertest";
import app from "../../app";
import { IUser } from "../../models/User";

const userTmp: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const createUser = () => {
  return supertest(app).post("/api/v1/user").send(userTmp);
};

describe("User REST API TEST", () => {
  test("Fetching list of users", async () => {
    await createUser();
    await createUser();
    await createUser();

    const response = await supertest(app).get("/api/v1/user").expect(200);
    expect(response.body._data.length).toEqual(3);
  });
});
