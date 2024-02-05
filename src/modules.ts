import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CoreModule } from './core/core.module';

const applicationModules = [AuthModule, UserModule];
@Module({
  imports: [CoreModule, ...applicationModules],
})
export class Modules {}
