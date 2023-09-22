import { autoInjectable, inject, injectable } from "tsyringe";
import Todo from "../models/Todo";
import BaseController from "./base.controller";
import IService from "../interfaces/crud.interface";

@autoInjectable()
export default class TodoController extends BaseController {
  constructor(@inject("IService") iService: IService<Todo>) {
    super(iService);
    delete this.delete;
  }
}
