import { TDatabaseConfig } from '@common/types/config.type';
import migrations from '@database/migrations';
import { registerAs } from '@nestjs/config';

const databaseConfig = registerAs(
  'database',
  (): TDatabaseConfig => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ssl: { rejectUnauthorized: false },
    migrations,
    autoLoadEntities: true,
    logging: true,
  }),
);

export default databaseConfig;
