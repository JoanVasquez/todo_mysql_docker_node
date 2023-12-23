import express, { Router } from "express";
import { container } from "tsyringe";
import { validateRequest } from "../middlewares/exception.middleware";
import TodoController from "../controllers/todo.controller";
import {
  paginationValidation,
  todoValidation,
} from "../validations/validation";
import TodoService from "../services/todo.service";

const router: Router = express.Router();
container.register("IService", { useClass: TodoService });
const todoController: TodoController = container.resolve(TodoController);

router.get("/todo/total", todoController.totalRecords!);
router.get("/todo", todoController.findAll!);
router.get(
  "/todo/paginated",
  paginationValidation,
  validateRequest,
  todoController.findAllPaginated!
);
router.get("/todo/:id", todoController.findById!);
router.post("/todo", todoValidation, validateRequest, todoController.save!);
router.put(
  "/todo/:id",
  todoValidation,
  validateRequest,
  todoController.update!
);

export default router;
