import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user.router";
import todoRouter from "./routes/todo.router";
import ResponseTemplate from "./utils/response.template";
import httpStatus from "./utils/http.status";
import { errorHandler } from "./middlewares/exception.middleware";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", todoRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(
    new ResponseTemplate(
      httpStatus.NOT_FOUND.code,
      httpStatus.NOT_FOUND.status,
      "Route not found"
    )
  );
});
app.use(errorHandler);
export default app;
