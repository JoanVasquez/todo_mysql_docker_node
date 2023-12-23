export default interface IService<T> {
  save?(data: T): Promise<T>;
  update?(id: number, data: T): Promise<T>;
  delete?(id: number): Promise<any>;
  findById?(id: number): Promise<T>;
  findAll?(): Promise<Array<T>>;
  findAllPaginated?(limit: number, offset: number): Promise<any>;
  total?(): Promise<number>;
}
