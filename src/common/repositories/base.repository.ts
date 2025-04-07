import { Model } from "mongoose";

export abstract class BaseRepository<T> {
  constructor(
    private readonly model: Model<T>,
    private readonly modelName: string,
  ) {}
}