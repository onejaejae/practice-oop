import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserShowDto } from '../../../common/response/user/userShowDto';
import { AuthGuard } from 'src/core/guard/auth.guard';
import { User } from 'src/core/decorator/user.decorator';
import { IPayload } from 'src/common/type/jwt';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUser(@User() user: IPayload): Promise<UserShowDto> {
    return this.userService.getUser(user.sub);
  }
}
