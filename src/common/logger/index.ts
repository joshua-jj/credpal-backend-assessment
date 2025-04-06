import configuration from '@config/env.config';
import { createLogger, format, transports } from 'winston';
import * as Transport from 'winston-transport';

let logTransports: Transport[];

if (configuration.NODE_ENV !== 'production') {
  logTransports = [new transports.Console()];
} else {
  logTransports = [new transports.File({ filename: 'logs/logs.log' })];
}

let logFormat = format.combine(
  format.colorize(),
  format.splat(),
  format.metadata(),
  format.timestamp(),
  format.printf(({ timestamp, level, message, metadata }) => {
    return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
  }),
);

let logger = createLogger({ transports: logTransports, format: logFormat });

export default logger;
