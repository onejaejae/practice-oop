import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/components/domain/user.entity';

export class UserSignUpReq {
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
