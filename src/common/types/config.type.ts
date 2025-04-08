import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export type TDatabaseConfig = MysqlConnectionOptions & {
  autoLoadEntities: boolean;
};

export type JwtConfig =  {
  secret: string;
  expiresIn: string;
};
