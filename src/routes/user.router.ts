import express, { Router } from "express";
import { container } from "tsyringe";
import { validateRequest } from "../middlewares/exception.middleware";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { userValidations } from "../validations/validation";

const router: Router = express.Router();
container.register("IService", { useClass: UserService });
const userController: UserController = container.resolve(UserController);

router.get("/user/total", userController.totalRecords!);
router.get("/user", userController.findAll!);
router.get("/user/:id", userController.findById!);
router.post("/user", userValidations, validateRequest, userController.save!);
router.put(
  "/user/:id",
  userValidations,
  validateRequest,
  userController.update!
);

export default router;
