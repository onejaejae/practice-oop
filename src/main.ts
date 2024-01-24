import { NestFactory, Reflector } from '@nestjs/core';
import { Modules } from './modules';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/allExceptionFilter';
import { CustomValidationException } from './common/exception/custom.validation.exception';
import { BadParameterFilter } from './common/filter/badParameterFilter';
import { ApiResponseInterceptor } from './common/interceptor/apiResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(Modules);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((e) => new CustomValidationException(e)),
        );
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new BadParameterFilter());

  await app.listen(3000);
}
bootstrap();
