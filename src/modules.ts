import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './common/interceptor/error.interceptor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorInterceptor }],
})
export class Modules {}
