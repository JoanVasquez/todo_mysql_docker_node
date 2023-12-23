import { container, injectable } from "tsyringe";
import IService from "../interfaces/crud.interface";
import Todo from "../models/Todo";
import TodoRepository from "../repositories/todo.repository";
import { throwError } from "../middlewares/exception.middleware";
import httpStatus from "../utils/http.status";
import BaseService from "./base.service";

@injectable()
export default class TodoService extends BaseService<Todo> {
  constructor(private todoRepository: TodoRepository) {
    super(todoRepository, "todo_redis");
    delete this.delete;
  }
}
