import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from 'src/entities/user/user-repository.interface';
import { IUserService } from '../interface/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepositoryKey) private readonly userRepository: IUserRepository,
  ) {}

  async getUser(userId: number) {
    const user = await this.userRepository.findByIdOrThrow(userId);
    return user.withoutPassword();
  }
}
