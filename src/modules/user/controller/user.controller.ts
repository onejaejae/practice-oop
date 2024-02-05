import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UserShowDto } from '../../../common/response/user/userShowDto';
import { AuthGuard } from 'src/core/guard/auth.guard';
import { User } from 'src/core/decorator/user.decorator';
import { IPayload } from 'src/common/type/jwt';
import {
  IUserService,
  UserServiceKey,
} from '../interface/user-service.interface';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(UserServiceKey) private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUser(@User() user: IPayload): Promise<UserShowDto> {
    return this.userService.getUser(user.sub);
  }
}
