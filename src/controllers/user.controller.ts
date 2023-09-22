import { autoInjectable, inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import IService from "../interfaces/crud.interface";
import User from "../models/User";

@autoInjectable()
export default class UserController extends BaseController {
  constructor(@inject("IService") iService: IService<User>) {
    super(iService);
    delete this.delete;
  }
}
