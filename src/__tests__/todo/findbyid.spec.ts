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

describe("User REST API TEST", () => {
  test("Fetching find user by ID", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    const createdTodoResponse = await createTodo();

    const foundTodoResponse = await supertest(app)
      .get(`/api/v1/todo/${createdTodoResponse.body._data.id}`)
      .expect(200);

    expect(foundTodoResponse.body._data.title).toEqual(tmpTodo.title);
  });

  test("Fetching find todo by ID - Not found", async () => {
    const foundTodoResponse = await supertest(app).get("/api/v1/todo/22");
    expect(foundTodoResponse.statusCode).toEqual(204);
  });
});
