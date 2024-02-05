import { NestFactory, Reflector } from '@nestjs/core';
import { Modules } from './modules';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { CustomValidationException } from './core/exception/custom.validation.exception';

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

  await app.listen(3000);
}
bootstrap();
