import supertest from "supertest";
import app from "../../app";
import { IUser } from "../../models/User";
import Todo, { ITodo } from "../../models/Todo";

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

describe("Todo REST API TEST", () => {
  test("Testing creation of todo", async () => {
    const responseUser = await createUse();

    tmpTodo.userId = responseUser.body._data.id;

    let todos = await Todo.findAll();
    expect(todos.length).toEqual(0);

    await createTodo().expect(201);
    todos = await Todo.findAll();

    expect(todos.length).toEqual(1);
    expect(todos[0].title).toEqual("test todo");
  });

  test("Testing creation of todo - validation", async () => {
    const createTodoResponse = await supertest(app)
      .post("/api/v1/todo")
      .send({ title: "", description: "test", isDone: false } as ITodo);

    expect(createTodoResponse.statusCode).toEqual(400);
  });
});
