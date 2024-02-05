import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { JWTModule } from 'src/core/jwt/jwt.module';

@Module({
  imports: [UserRepositoryModule, JWTModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
