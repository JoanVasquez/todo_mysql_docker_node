import { Model, ModelCtor } from "sequelize-typescript";
import { Includeable } from "sequelize";

export default abstract class BaseRepository<T extends Model<T>> {
  constructor(
    private model: ModelCtor<T>,
    private includedEntities?: Array<Includeable>
  ) {}

  createEntity = async (data: any): Promise<any> => {
    const resource: any = await this.model.create(data, {
      include: this.includedEntities,
    });
    return resource;
  };

  updateEntity = async (id: number, data: any): Promise<any> => {
    return await this.model.update(data, {
      returning: true,
      where: { id } as any,
    });
  };

  deleteEntity = async (id: number): Promise<any> => {
    await this.model.destroy({ where: { id } as any });
    return true;
  };

  findAllEntity = async (): Promise<Array<any>> => {
    return await this.model.findAll({ include: this.includedEntities });
  };

  findEntityById = async (id: number): Promise<any> => {
    const entity: any = await this.model.findOne({
      where: { id } as any,
      include: this.includedEntities,
    });

    return entity;
  };

  totalEntity = async (): Promise<any> => await this.model.count();
}
