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
  test("Fetching find user by ID", async () => {
    const response = await createUser();

    const foundUser = await supertest(app)
      .get(`/api/v1/user/${response.body._data.id}`)
      .expect(200);
    expect(foundUser.body._data.firstName).toEqual(userTmp.firstName);
  });

  test("Fetching find user by ID - Not found", async () => {
    const foundUserResponse = await supertest(app).get("/api/v1/user/22");
    expect(foundUserResponse.statusCode).toEqual(204);
  });
});
