import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpReq } from '../user/dto/userSignUpReq';
import { UserShowDto } from '../user/dto/userShowDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() userSignUpReq: UserSignUpReq): Promise<UserShowDto> {
    return this.authService.signUp(userSignUpReq);
  }
}
