import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpReq } from '../../../common/request/auth/signUpReq';
import { Auth } from '../../../entities/auth/auth.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { AuthRepository } from 'src/entities/auth/auth.repository';
import { QueueProducer } from 'src/core/queue/queue.producer';
import { JwtProvider, JwtProviderKey } from 'src/core/jwt/jwt.provider';
import { SignInReq } from 'src/common/request/auth/signInReq';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtProviderKey) private readonly jwtProvider: JwtProvider,
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

    const updatedUserEntity = authWithUser.setUserVerifiedStatus(
      authWithUser.User,
    );
    await this.userRepository.update(updatedUserEntity);

    return accessToken;
  }

  async signUp(signUpReq: SignUpReq) {
    await this.userRepository.findOneOrThrow({ email: signUpReq.email });

    const userEntity = await signUpReq.toEntity();
    const user = await this.userRepository.createEntity(userEntity);

    const authEntity = Auth.from(user.id);
    const auth = await this.authRepository.createEntity(authEntity);

    await this.queueProducer.mailSend(user.email, auth.certificationKey);
  }

  async singIn(signInReq: SignInReq) {
    const { email, password } = signInReq;
    const user = await this.userRepository.findOneOrThrow({
      email,
    });

    if (!user.isRegistered())
      throw new ForbiddenException('email 인증을 완료해주세요.');
    if (!(await user.isSamePassword(password)))
      throw new BadRequestException('invalid password');

    return this.jwtProvider.signAsync({
      sub: user.id,
      email: user.email,
    });
  }
}
