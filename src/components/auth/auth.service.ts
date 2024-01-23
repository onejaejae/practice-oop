import { Injectable } from '@nestjs/common';
import { UserSignUpReq } from '../user/dto/userSignUpReq';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(userSignUpReq: UserSignUpReq) {
    const userEntity = userSignUpReq.toEntity();
    const user = await this.userRepository.createEntity(userEntity);

    return user;
  }
}
