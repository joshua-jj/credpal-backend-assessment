export interface IBaseRepository<T> {
  create: (data: T) => void;
  getAll: () => Promise<T[]>;
  update: (data: T) => void;
  getById: (id: string) => Promise<T>;
  delete: (id: string) => void;
}
