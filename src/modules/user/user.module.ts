import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
