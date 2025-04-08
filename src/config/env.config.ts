import databaseConfig from './database.config';
import jwtConfig from './jwt.config';

const configuration = () => ({
  port: process.env.PORT,
  database: databaseConfig(),
  jwt: jwtConfig(),
});

export default configuration;
