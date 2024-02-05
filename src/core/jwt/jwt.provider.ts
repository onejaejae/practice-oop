import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  async signAsync(payload: { sub: number; email: string }) {
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
