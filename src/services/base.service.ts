import IService from "../interfaces/crud.interface";
import { throwError } from "../middlewares/exception.middleware";
import BaseRepository from "../repositories/base.repository";
import httpStatus from "../utils/http.status";

export default abstract class BaseService<T> implements IService<T> {
  constructor(private baseRepository: BaseRepository<any>) {}

  async save?(data: T): Promise<T> {
    return await this.baseRepository.createEntity(data);
  }
  async update?(id: number, data: T): Promise<T> {
    await this.notFound(id);
    await this.baseRepository.updateEntity(id, data);
    return await this.findById!(id);
  }
  async delete?(id: number): Promise<any> {
    await this.notFound(id);
    return await this.baseRepository.deleteEntity(id);
  }
  async findById?(id: number): Promise<T> {
    await this.notFound(id);
    return this.baseRepository.findEntityById(id);
  }
  async findAll?(): Promise<T[]> {
    return this.baseRepository.findAllEntity();
  }
  async total?(): Promise<number> {
    return await this.baseRepository.totalEntity();
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
