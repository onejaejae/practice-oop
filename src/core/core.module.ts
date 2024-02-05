import {
  ClassProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ApiResponseInterceptor } from './interceptor/apiResponseInterceptor';
import { TransactionManager } from './database/typeorm/transaction.manager';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { AllExceptionsFilter } from './filter/allExceptionFilter';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { ConfigModule } from './config/config.module';
import { TypeORMExceptionFilter } from './filter/typeorm.exception.filter';

const modules = [ConfigModule];
const providers = [TransactionManager];
const interceptors: ClassProvider[] = [
  { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
  { provide: APP_INTERCEPTOR, useClass: ApiResponseInterceptor },
];
const filters: ClassProvider[] = [
  { provide: APP_FILTER, useClass: AllExceptionsFilter },

  { provide: APP_FILTER, useClass: TypeORMExceptionFilter },
];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [...providers, ...interceptors, ...filters],
  exports: [...modules, ...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
