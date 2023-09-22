import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import httpStatus from "../utils/http.status";
import ResponseTemplate from "../utils/response.template";

export class ErrorException extends Error {
  statusCode: number = 500;
  status: string = "";
  message: string = "";

  constructor(responseTemplate: ResponseTemplate) {
    super(responseTemplate.message);
    Object.setPrototypeOf(this, ErrorException.prototype);
    this.statusCode = responseTemplate.statusCode;
    this.status = responseTemplate.status;
    this.message = responseTemplate.message;
  }
}

export const errorHandler = (
  err: ErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, status, message } = err;
  res
    .status(statusCode)
    .send(new ResponseTemplate(statusCode, status, message));
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      new ResponseTemplate(
        httpStatus.BAD_REQUEST.code,
        httpStatus.BAD_REQUEST.status,
        errors.array()
      )
    );
  } else {
    next();
  }
};

export const throwError = (
  statusCode: number,
  status: string,
  message: string
): ErrorException => {
  return new ErrorException(new ResponseTemplate(statusCode, status, message));
};
