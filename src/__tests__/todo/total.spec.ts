import supertest from "supertest";
import app from "../../app";
import { IUser } from "../../models/User";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const tmpTodo: any = {
  title: "test title",
  description: "test description",
  isDone: false,
};

const createUse = () => supertest(app).post("/api/v1/user").send(tmpUser);
const createTodo = () => supertest(app).post("/api/v1/todo").send(tmpTodo);

describe("Todo REST API TEST", () => {
  test("Fetching total of todos", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    await createTodo();

    const foundTodoResponse = await supertest(app)
      .get("/api/v1/todo/total")
      .expect(200);

    expect(foundTodoResponse.body._data).toEqual(1);
  });
});
