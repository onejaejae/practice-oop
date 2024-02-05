import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSignUpReq } from '../user/dto/userSignUpReq';
import { UserRepository } from '../user/user.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AuthRepository } from './auth.repository';
import { Auth } from '../../entities/auth/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('joinQueue')
    private joinQueue: Queue,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async verification(certificationKey: string) {
    const authWithUser = await this.authRepository.joinWithUser({
      certificationKey,
    });

    if (!authWithUser.User) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    if (authWithUser.User.isRegistered())
      throw new BadRequestException('이미 회원가입된 사용자입니다.');

    const updatedUserEntity = authWithUser.setUserVerifiedStatus(
      authWithUser.User,
    );
    await this.userRepository.update(updatedUserEntity);

    // todo
    // accesskey
  }

  async signUp(userSignUpReq: UserSignUpReq) {
    const userEntity = await userSignUpReq.toEntity();
    const user = await this.userRepository.createEntity(userEntity);

    const authEntity = Auth.from(user.id);
    const auth = await this.authRepository.createEntity(authEntity);

    await this.joinQueue.add(
      'mail-send',
      { email: user.email, certificationKey: auth.certificationKey },
      { removeOnComplete: true },
    );
  }
}
