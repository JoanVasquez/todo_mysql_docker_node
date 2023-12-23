import { DEFAULT_EXPIRATION, redisClient } from "..";
import IService from "../interfaces/crud.interface";
import { throwError } from "../middlewares/exception.middleware";
import BaseRepository from "../repositories/base.repository";
import httpStatus from "../utils/http.status";

export default abstract class BaseService<T> implements IService<T> {
  constructor(
    private baseRepository: BaseRepository<any>,
    private redisKey: string
  ) {}

  async save?(data: T): Promise<T> {
    const result = await this.baseRepository.createEntity(data);
    await this.cacheNewValue(result);
    return result;
  }
  async update?(id: number, data: T): Promise<T> {
    await this.notFound(id);
    const updatedData = await this.baseRepository.updateEntity(id, data);
    await this.cacheUpdateValue(id, updatedData);
    return updatedData;
  }
  async delete?(id: number): Promise<any> {
    await this.notFound(id);
    return await this.baseRepository.deleteEntity(id);
  }
  async findById?(id: number): Promise<T> {
    const cachedDataById = await redisClient.get(`${this.redisKey}_id=${id}`);

    if (cachedDataById) {
      return JSON.parse(cachedDataById);
    } else {
      await this.notFound(id);

      const data = await this.baseRepository.findEntityById(id);
      redisClient.setEx(
        `${this.redisKey}_id=${id}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      return data;
    }
  }
  async findAll?(): Promise<T[]> {
    const cachedData = await redisClient.get(this.redisKey);

    if (cachedData != null) {
      return JSON.parse(cachedData);
    } else {
      const data = await this.baseRepository.findAllEntity();
      await redisClient.setEx(
        this.redisKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      return data;
    }
  }
  async findAllPaginated?(limit: number, offset: number) {
    return await this.baseRepository.findAllPaginated(limit, offset);
  }
  async total?(): Promise<number> {
    return await await this.baseRepository.totalEntity();
  }

  private async cacheNewValue(data: any) {
    const cachedDataResult = await redisClient.get(this.redisKey);
    if (cachedDataResult) {
      const cachedData = JSON.parse(cachedDataResult);
      cachedData.push(data);
      await redisClient.setEx(
        this.redisKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(cachedData)
      );
    }
  }

  private async cacheUpdateValue(id: number, data: any) {
    const cachedDataResult = await redisClient.get(this.redisKey);

    if (cachedDataResult) {
      const cachedData = JSON.parse(cachedDataResult);
      const indexOfUpdatedData = cachedData.findIndex(
        (item: any) => item.id == id
      );
      cachedData[indexOfUpdatedData] = data;

      await redisClient.setEx(
        this.redisKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(cachedData)
      );
    }
  }

  private async notFound(id: number) {
    const entity = await this.baseRepository.findEntityById(id);
    if (!entity) {
      throw throwError(
        httpStatus.NOT_CONTENT.code,
        httpStatus.NOT_CONTENT.status,
        "Entity not found"
      );
    }
  }
}
