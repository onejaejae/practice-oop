import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpReq } from '../../../common/request/auth/signUpReq';
import { SignInReq } from 'src/common/request/auth/signInReq';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
