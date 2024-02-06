import { RootEntity } from '../typeorm/root.entity';

export interface GenericRepository<T extends RootEntity> {
  findOne(filters: Partial<T>): Promise<T>;
  findOneOrThrow(filters: Partial<T>): Promise<T>;
  findByIdOrThrow(id: number): Promise<T>;
  createEntity(model: T): Promise<T>;
  update(models: T): Promise<T>;
  deleteById(id: number): Promise<void>;
}
