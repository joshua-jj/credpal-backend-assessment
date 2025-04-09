import { DataSource } from 'typeorm';
import databaseConfig from './database';

const AppDataSource = new DataSource(databaseConfig());

export default AppDataSource;
