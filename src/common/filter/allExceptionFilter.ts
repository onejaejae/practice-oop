import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '../util/response.entity';
import { ResponseStatus } from '../util/response.status';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const trace =
      exception instanceof HttpException
        ? exception.stack
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('trace', trace);

    // todo log

    response
      .status(status)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH(
            '예기치 못한 에러입니다.',
            ResponseStatus.SERVER_ERROR,
          ),
        ),
      );
  }
}
