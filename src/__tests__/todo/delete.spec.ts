import supertest from "supertest";
import User, { IUser } from "../../models/User";
import app from "../../app";
import UserRepository from "../../repositories/user.repository";
import TodoService from "../../services/todo.service";
import TodoRepository from "../../repositories/todo.repository";

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

const todoRepository: TodoRepository = new TodoRepository();
const todoService: TodoService = new TodoService(todoRepository);

describe("User Service  TEST - Delete", () => {
  test("Testing delete of user", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    const createdTodoResponse = await createTodo();
    const foundTodoResponse = await supertest(app)
      .get(`/api/v1/todo/${createdTodoResponse.body._data.id}`)
      .expect(200);

    const isDeleted = await todoService.delete!(
      foundTodoResponse.body._data.id
    );
    expect(isDeleted).toEqual(true);
  });
});
