import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from 'src/common/type/jwt';

export const JwtProviderKey = 'JwtProviderKey';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  async signAsync(payload: IPayload) {
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
