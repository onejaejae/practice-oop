import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    AuthModule,
    UserModule,
  ],
})
export class Modules {}
