import supertest from "supertest";
import app from "../../app";
import User, { IUser } from "../../models/User";
import { ITodo } from "../../models/Todo";

const tmpUser: IUser = {
  firstName: "test",
  lastName: "test",
  userName: "test",
};

const tmpTodo: any = {
  title: "test todo",
  description: "test todo description",
  isDone: false,
};

const createUse = () => supertest(app).post("/api/v1/user").send(tmpUser);
const createTodo = () => supertest(app).post("/api/v1/todo").send(tmpTodo);

describe("User REST API TEST", () => {
  test("Testing todo not found by ID", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    const notFoundTodoResponse = await supertest(app)
      .put("/api/v1/todo/22")
      .send(tmpTodo);
    expect(notFoundTodoResponse.statusCode).toEqual(204);
  });

  test("Testing todo validation ==> update", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    const responseTodo = await supertest(app)
      .post("/api/v1/todo")
      .send(tmpTodo);

    const updatedResponseTodo = await supertest(app)
      .put(`/api/v1/todo/${responseTodo.body._data.id}`)
      .send({
        title: "",
        description: "Test description",
        isDone: false,
      } as ITodo);
    expect(updatedResponseTodo.statusCode).toEqual(400);
  });

  test("Testing updating of todo", async () => {
    const newUserResponse = await createUse();
    tmpTodo.userId = newUserResponse.body._data.id;

    const newResponseTodo = await supertest(app)
      .post("/api/v1/todo")
      .send(tmpTodo)
      .expect(201);

    tmpTodo.title = "new title";

    const updatedResponseTodo = await createTodo();

    expect(updatedResponseTodo.body._data.title).toEqual("new title");
  });
});
