import { injectable, singleton } from "tsyringe";
import Todo from "../models/Todo";
import TodoRepository from "../repositories/todo.repository";
import BaseService from "./base.service";

@singleton()
@injectable()
export default class TodoService extends BaseService<Todo> {
  constructor(private todoRepository: TodoRepository) {
    super(todoRepository, "todo_redis");
    delete this.delete;
  }
}
