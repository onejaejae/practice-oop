import { SignInReq } from 'src/common/request/auth/signInReq';
import { SignUpReq } from 'src/common/request/auth/signUpReq';

export const AuthServiceKey = 'AuthServiceKey';

export interface IAuthService {
  verification(certificationKey: string): Promise<string>;
  signUp(signUpReq: SignUpReq): Promise<void>;
  singIn(signInReq: SignInReq): Promise<string>;
}
