import supertest from "supertest";
import app from "../../app";
import User, { IUser } from "../../models/User";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const createUse = () => supertest(app).post("/api/v1/user").send(tmpUser);

describe("User REST API TEST", () => {
  test("Testing creation of user", async () => {
    let users = await User.findAll();
    expect(users.length).toEqual(0);
    await createUse().expect(201);
    users = await User.findAll();
    expect(users.length).toEqual(1);
    expect(users[0].firstName).toEqual("test two");
  });

  test("Testing creation of user - validation", async () => {
    const createdUserResponse = await supertest(app)
      .post("/api/v1/user")
      .send({ firstName: "", lastName: "test", userName: "" } as IUser);

    expect(createdUserResponse.statusCode).toEqual(400);
  });
});
