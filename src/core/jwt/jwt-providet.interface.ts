import { IJwtPayload, IPayload } from 'src/common/type/jwt';

export const JwtProviderKey = 'JwtProviderKey';

export interface IJwtProvider {
  signAsync(payload: IPayload): Promise<string>;
  verifyAsync(token: string): Promise<IJwtPayload>;
}
