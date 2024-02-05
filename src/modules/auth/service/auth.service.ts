import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSignUpReq } from '../../../common/request/auth/userSignUpReq';
import { Auth } from '../../../entities/auth/auth.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { AuthRepository } from 'src/entities/auth/auth.repository';
import { QueueProducer } from 'src/core/queue/queue.producer';
import { JwtProvider } from 'src/core/jwt/jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly queueProducer: QueueProducer,
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

    const accessToken = await this.jwtProvider.signAsync({
      sub: authWithUser.User.id,
      email: authWithUser.User.email,
    });
    authWithUser.User.accessToken = accessToken;

    const updatedUserEntity = authWithUser.setUserVerifiedStatus(
      authWithUser.User,
    );
    await this.userRepository.update(updatedUserEntity);

    return accessToken;
  }

  async signUp(userSignUpReq: UserSignUpReq) {
    await this.userRepository.findOneOrThrow({ email: userSignUpReq.email });

    const userEntity = await userSignUpReq.toEntity();
    const user = await this.userRepository.createEntity(userEntity);

    const authEntity = Auth.from(user.id);
    const auth = await this.authRepository.createEntity(authEntity);

    await this.queueProducer.mailSend(user.email, auth.certificationKey);
  }
}
