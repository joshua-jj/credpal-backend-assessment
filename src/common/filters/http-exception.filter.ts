import { LoggerService } from '@common/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggerService(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.getResponse()['message'] || 'Something went wrong';

    const loggerMessage = `An error occurred ${JSON.stringify({
      statusCode,
      message,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    })}`;

    this.logger.error(loggerMessage);

    response.status(statusCode).json({
      statusCode,
      message: Array.isArray(message) ? message.join(', ') + '.' : message,
    });
  }
}
