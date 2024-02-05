import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpReq } from '../user/dto/userSignUpReq';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/verification')
  async verification(
    @Query('certificationKey') certificationKey: string,
  ): Promise<void> {
    return this.authService.verification(certificationKey);
  }

  @Post('/signup')
  async signUp(@Body() userSignUpReq: UserSignUpReq): Promise<void> {
    return this.authService.signUp(userSignUpReq);
  }
}
