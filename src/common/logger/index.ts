import configuration from '@config/env.config';
import { createLogger, format, transports } from 'winston';
import * as Transport from 'winston-transport';

let logTransports: Transport[];

if (configuration.NODE_ENV !== 'production') {
  logTransports = [new transports.Console()];
} else {
  logTransports = [new transports.Console(), new transports.File({ filename: 'logs/logs.log' })];
}

const logFormat = format.combine(
  format.colorize(),
  format.splat(),
  format.metadata(),
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}.`;
  }),
);

const logger = createLogger({ transports: logTransports, format: logFormat });

export default logger;
