import { Includeable } from "sequelize";
import Todo from "../models/Todo";
import BaseRepository from "./base.repository";
import User from "../models/User";
import { injectable } from "tsyringe";

@injectable()
export default class TodoRepository extends BaseRepository<Todo> {
  constructor() {
    super(Todo, [
      {
        model: User,
      },
    ] as Array<Includeable>);
  }
}
