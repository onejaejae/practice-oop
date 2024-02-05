import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/entities/user/user.entity';

export class SignUpReq {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  async toEntity(): Promise<User> {
    return User.signup(this.email, this.name, this.password);
  }
}
