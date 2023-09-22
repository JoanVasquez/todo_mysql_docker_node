import { NextFunction, Request, Response } from "express";
import httpStatus from "../utils/http.status";
import ResponseTemplate from "../utils/response.template";
import IService from "../interfaces/crud.interface";

export default abstract class BaseController {
  constructor(private baseService: IService<any>) {}

  save? = (req: Request, res: Response) =>
    this.baseService.save!(req.body).then((createdEntity) =>
      res
        .status(httpStatus.CREATED.code)
        .send(
          new ResponseTemplate(
            httpStatus.CREATED.code,
            httpStatus.CREATED.status,
            "CREATED",
            createdEntity
          )
        )
    );

  update? = (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    this.baseService.update!(id, req.body)
      .then((updatedEntity) =>
        res
          .status(httpStatus.OK.code)
          .send(
            new ResponseTemplate(
              httpStatus.OK.code,
              httpStatus.OK.status,
              "UPDATED",
              updatedEntity
            )
          )
      )
      .catch((error) => next(error));
  };

  delete? = (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    this.baseService.delete!(id)
      .then((isDeleted) =>
        res
          .status(httpStatus.OK.code)
          .send(
            new ResponseTemplate(
              httpStatus.OK.code,
              httpStatus.OK.status,
              "DELETED",
              isDeleted
            )
          )
      )
      .catch((error) => next(error));
  };

  findById? = (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    this.baseService.findById!(id)
      .then((entity) =>
        res
          .status(httpStatus.OK.code)
          .send(
            new ResponseTemplate(
              httpStatus.OK.code,
              httpStatus.OK.status,
              "FOUND",
              entity
            )
          )
      )
      .catch((error) => next(error));
  };

  findAll? = (req: Request, res: Response) =>
    this.baseService.findAll!().then((entities) =>
      res
        .status(httpStatus.OK.code)
        .send(
          new ResponseTemplate(
            httpStatus.OK.code,
            httpStatus.OK.status,
            "FOUND",
            entities
          )
        )
    );

  totalRecords? = (req: Request, res: Response) =>
    this.baseService.total!().then((records) =>
      res
        .status(httpStatus.OK.code)
        .send(
          new ResponseTemplate(
            httpStatus.OK.code,
            httpStatus.OK.status,
            "TOTAL",
            records
          )
        )
    );
}
