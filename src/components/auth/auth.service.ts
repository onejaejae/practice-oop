import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    const userEntity = createUserDto.toEntity();
    const user = await this.userRepository.createEntity(userEntity);
    console.log('user', user);

    return user;
  }
}
