import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { AuthRepositoryModule } from 'src/entities/auth/auth-repository.module';
import { QueueModule } from 'src/core/queue/queue.module';
import { JWTModule } from 'src/core/jwt/jwt.module';

@Module({
  imports: [UserRepositoryModule, AuthRepositoryModule, QueueModule, JWTModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
