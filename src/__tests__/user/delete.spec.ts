import supertest from "supertest";
import User, { IUser } from "../../models/User";
import app from "../../app";
import UserService from "../../services/user.service";
import UserRepository from "../../repositories/user.repository";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);
const createUse = () => supertest(app).post("/api/v1/user").send(tmpUser);

describe("User Service  TEST - Delete", () => {
  test("Testing delete of user", async () => {
    const response = await createUse().expect(201);
    const isDeleted = await userService.delete!(response.body._data.id);
    expect(isDeleted).toEqual(true);
  });
});
