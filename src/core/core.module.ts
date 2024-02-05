import {
  ClassProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ApiResponseInterceptor } from './interceptor/apiResponseInterceptor';
import { TransactionManager } from './database/transaction.manager';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { AllExceptionsFilter } from './filter/allExceptionFilter';
import { BadParameterFilter } from './filter/badParameterFilter';

const modules = [DatabaseModule];
const providers = [TransactionManager];
const interceptors: ClassProvider[] = [
  { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
  { provide: APP_INTERCEPTOR, useClass: ApiResponseInterceptor },
];
const filters: ClassProvider[] = [
  { provide: APP_FILTER, useClass: AllExceptionsFilter },
  { provide: APP_FILTER, useClass: BadParameterFilter },
];

@Global()
@Module({
  imports: [...modules],
  providers: [...providers, ...interceptors, ...filters],
  exports: [...modules, ...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
