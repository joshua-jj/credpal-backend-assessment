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
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.getResponse()['message'] || 'Something went wrong';

    response.status(statusCode).json({
      statusCode,
      message: Array.isArray(message) ? message.join(', ') + '.' : message,
    });
  }
}
