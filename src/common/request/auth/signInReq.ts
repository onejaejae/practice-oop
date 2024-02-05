import { IsEmail, IsString } from 'class-validator';

export class SignInReq {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
