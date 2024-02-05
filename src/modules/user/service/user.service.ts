import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from 'src/entities/user/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryKey) private readonly userRepository: IUserRepository,
  ) {}

  async getUser(userId: number) {
    const user = await this.userRepository.findByIdOrThrow(userId);
    return user.withoutPassword();
  }
}
