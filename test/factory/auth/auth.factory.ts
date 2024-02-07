import { plainToInstance } from 'class-transformer';
import { SignInReq } from 'src/common/request/auth/signInReq';
import { SignUpReq } from 'src/common/request/auth/signUpReq';
import { Auth } from 'src/entities/auth/auth.entity';

export class AuthFactory {
  mockAuth(userId: number) {
    return plainToInstance(Auth, {
      certificationKey: 'certification',
      userId,
    });
  }

  generateUnexistSignInReq() {
    const signInReq = new SignInReq();
    signInReq.email = 'unExist';
    signInReq.password = 'invalid';

    return signInReq;
  }

  generateSignInReq(email: string, password: string) {
    const signInReq = new SignInReq();
    signInReq.email = email;
    signInReq.password = password;

    return signInReq;
  }

  generateSignUpReq(email: string, password: string, name: string) {
    const signUpReq = new SignUpReq();
    signUpReq.email = email;
    signUpReq.password = password;
    signUpReq.name = name;

    return signUpReq;
  }

  generateMockSignUpReq() {
    const signUpReq = new SignUpReq();
    signUpReq.email = 'test@naver.com';
    signUpReq.password = 'test';
    signUpReq.name = 'test';

    return signUpReq;
  }
}
