import { Injectable } from '@nestjs/common';
import { UserSignUpReq } from '../user/dto/userSignUpReq';
import { UserRepository } from '../user/user.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('joinQueue')
    private joinQueue: Queue,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(userSignUpReq: UserSignUpReq) {
    const userEntity = userSignUpReq.toEntity();
    const user = await this.userRepository.createEntity(userEntity);

    await this.joinQueue.add(
      'mail-send',
      { email: user.email },
      { removeOnComplete: true },
    );
    return user.userWithoutPassword();
  }
}
