import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IJwtProvider, JwtProviderKey } from '../jwt/jwt-providet.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtProviderKey) private jwtProvider: IJwtProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException('headers에 token을 포함해주세요.');

    try {
      const payload = await this.jwtProvider.verifyAsync(token);
      console.log('payload', payload);

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
