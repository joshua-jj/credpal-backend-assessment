export interface IBaseAbstractEntity {
  id: string | number;
  createdBy: string | number;
  updatedBy: string | number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}