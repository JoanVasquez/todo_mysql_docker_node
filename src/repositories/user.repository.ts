import { injectable } from "tsyringe";
import User from "../models/User";
import BaseRepository from "./base.repository";

@injectable()
export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
