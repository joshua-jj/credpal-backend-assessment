import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import databaseConfig from './database';

config({ path: '.env' });

const AppDataSource = new DataSource(databaseConfig());

export default AppDataSource;
