import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { SignUpReq } from '../../../common/request/auth/signUpReq';
import { SignInReq } from 'src/common/request/auth/signInReq';
import {
  AuthServiceKey,
  IAuthService,
} from '../interface/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceKey) private readonly authService: IAuthService,
  ) {}

  @Get('/verification')
  async verification(
    @Query('certificationKey') certificationKey: string,
  ): Promise<string> {
    return this.authService.verification(certificationKey);
  }

  @Post('/signup')
  async signUp(@Body() signUpReq: SignUpReq): Promise<void> {
    return this.authService.signUp(signUpReq);
  }

  @Post('/signin')
  async login(@Body() signInReq: SignInReq): Promise<string> {
    return this.authService.singIn(signInReq);
  }
}
