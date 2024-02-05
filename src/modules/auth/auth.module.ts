import { ClassProvider, Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { AuthRepositoryModule } from 'src/entities/auth/auth-repository.module';
import { QueueModule } from 'src/core/queue/queue.module';
import { JWTModule } from 'src/core/jwt/jwt.module';
import { AuthServiceKey } from './interface/auth-service.interface';

const authService: ClassProvider = {
  provide: AuthServiceKey,
  useClass: AuthService,
};
@Module({
  imports: [UserRepositoryModule, AuthRepositoryModule, QueueModule, JWTModule],
  controllers: [AuthController],
  providers: [authService],
})
export class AuthModule {}
