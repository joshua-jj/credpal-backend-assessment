import databaseConfig from './database';
import jwtConfig from './jwt';

const configuration = () => ({
  port: process.env.PORT,
  database: databaseConfig(),
  jwt: jwtConfig(),
});

export default configuration;
