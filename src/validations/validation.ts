import { body, query } from "express-validator";
import validationMessage from "../utils/validation.messages";

export const userValidations = [
  body("userName").not().isEmpty().withMessage(validationMessage.REQUIRED),
  body("firstName").not().isEmpty().withMessage(validationMessage.REQUIRED),
  body("lastName").not().isEmpty().withMessage(validationMessage.REQUIRED),
];

export const todoValidation = [
  body("title").not().isEmpty().withMessage(validationMessage.REQUIRED),
  body("description").not().isEmpty().withMessage(validationMessage.REQUIRED),
  body("userId").not().isEmpty().withMessage(validationMessage.REQUIRED),
];

export const paginationValidation = [
  query("page").isNumeric().withMessage(validationMessage.PAGE_VALIDATION),
  query("per_page")
    .isNumeric()
    .withMessage(validationMessage.PER_PAGE_VALIDATION),
];
