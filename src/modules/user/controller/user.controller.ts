import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserShowDto } from '../../../common/response/user/userShowDto';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') userId: number): Promise<UserShowDto> {
    return this.userService.getUser(userId);
  }
}
