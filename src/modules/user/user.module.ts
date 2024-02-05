import { ClassProvider, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { JWTModule } from 'src/core/jwt/jwt.module';
import { UserServiceKey } from './interface/user-service.interface';

const userService: ClassProvider = {
  provide: UserServiceKey,
  useClass: UserService,
};
@Module({
  imports: [UserRepositoryModule, JWTModule],
  controllers: [UserController],
  providers: [userService],
})
export class UserModule {}
