import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

export default configuration;
