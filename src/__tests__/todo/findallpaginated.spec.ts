import supertest from "supertest";
import app from "../../app";
import { ITodo } from "../../models/Todo";
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
  test("Fetching list of todos", async () => {
    const responseUser = await createUse();
    tmpTodo.userId = responseUser.body._data.id;

    await createTodo();
    await createTodo();
    await createTodo();

    const response = await supertest(app)
      .get("/api/v1/todo/paginated?page=1&per_page=10")
      .expect(200);
    expect(response.body._data.items.length).toEqual(3);
  });
});
