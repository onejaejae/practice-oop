import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserSignUpReq } from '../../../common/request/auth/userSignUpReq';

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
  async signUp(@Body() userSignUpReq: UserSignUpReq): Promise<void> {
    return this.authService.signUp(userSignUpReq);
  }
}
