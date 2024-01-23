import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { CustomValidationException } from '../exception/custom.validation.exception';
import { ResponseEntity } from '../util/response.entity';
import { instanceToPlain } from 'class-transformer';
import { ResponseStatus } from '../util/response.status';

@Catch(BadRequestException)
export class BadParameterFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse();
    const isValidationError = responseBody instanceof ValidationError;

    response
      .status(status)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA<CustomValidationException[]>(
            '요청 값에 문제가 있습니다.',
            ResponseStatus.BAD_PARAMETER,
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody.message as CustomValidationException[]),
          ),
        ),
      );
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationException {
    return new CustomValidationException(responseBody);
  }
}
