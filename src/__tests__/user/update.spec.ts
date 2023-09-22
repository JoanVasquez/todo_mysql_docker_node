import supertest from "supertest";
import app from "../../app";
import User, { IUser } from "../../models/User";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

describe("User REST API TEST", () => {
  test("Testing user not found by ID ==> update", async () => {
    const notFoundUserResponse = await supertest(app)
      .put("/api/v1/user/22")
      .send(tmpUser);
    expect(notFoundUserResponse.statusCode).toEqual(204);
  });

  test("Testing user validation ==> update", async () => {
    const createdUserResponse = await supertest(app)
      .post("/api/v1/user")
      .send(tmpUser)
      .expect(201);

    const updatedUserResponse = await supertest(app)
      .put(`/api/v1/user/${createdUserResponse.body._data.id}`)
      .send({ firstName: "", lastName: "test", userName: "" } as IUser);
    expect(updatedUserResponse.statusCode).toEqual(400);
  });

  test("Testing updating of user", async () => {
    const newUserResponse = await supertest(app)
      .post("/api/v1/user")
      .send(tmpUser)
      .expect(201);
    tmpUser.firstName = "new first name";

    const updatedUserResponse = await supertest(app)
      .put(`/api/v1/user/${newUserResponse.body._data.id}`)
      .send(tmpUser)
      .expect(200);
    expect(updatedUserResponse.body._data.firstName).toEqual("new first name");
  });
});
