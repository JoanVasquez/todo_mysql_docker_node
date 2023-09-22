import { container, injectable } from "tsyringe";
import IService from "../interfaces/crud.interface";
import User, { IUser } from "../models/User";
import UserRepository from "../repositories/user.repository";
import { throwError } from "../middlewares/exception.middleware";
import httpStatus from "../utils/http.status";
import BaseService from "./base.service";

@injectable()
export default class UserService extends BaseService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
    delete this.delete;
  }
}
