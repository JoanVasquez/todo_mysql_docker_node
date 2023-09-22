import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { injectable, singleton } from "tsyringe";
import Todo from "./Todo";

export interface IUser {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
}

@singleton()
@injectable()
@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model<User> implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  userName: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  firstName: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  lastName: string;

  @HasMany(() => Todo, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true,
  })
  todos?: Array<Todo>;
}
