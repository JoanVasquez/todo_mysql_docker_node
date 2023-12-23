import { injectable, singleton } from "tsyringe";
import User, { IUser } from "../models/User";
import UserRepository from "../repositories/user.repository";

import BaseService from "./base.service";

@singleton()
@injectable()
export default class UserService extends BaseService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository, "user_redis");
    delete this.delete;
  }
}
