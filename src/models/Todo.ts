import {
  AutoIncrement,
  Column,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { injectable, singleton } from "tsyringe";
import User from "./User";

export interface ITodo {
  id?: number;
  title: string;
  description: string;
  isDone: boolean;
}

@singleton()
@injectable()
@Table({
  tableName: "todo",
  timestamps: true,
})
export default class Todo extends Model<Todo> implements ITodo {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  title: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  description: string;

  @AllowNull(false)
  @Column
  isDone: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
