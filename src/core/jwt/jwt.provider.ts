import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IPayload } from 'src/common/type/jwt';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  async signAsync(payload: IPayload) {
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
