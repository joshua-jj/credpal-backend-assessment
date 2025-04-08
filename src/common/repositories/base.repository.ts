import { IBaseRepository } from '@common/interfaces/base-repository.interface';
import { Repository } from 'typeorm';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly entityName: string,
  ) { }
  
  public async create(data: T): Promise<T> {
    return this.repository.create(data);
  }
}
