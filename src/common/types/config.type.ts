import { DataSourceOptions } from 'typeorm';

export type TDatabaseConfig = DataSourceOptions & {
  autoLoadEntities: boolean;
};

export type JwtConfig = {
  secret: string;
  expiresIn: string;
};
