import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserShowDto } from '../../common/response/user/userShowDto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') userId: number): Promise<UserShowDto> {
    return this.userService.getUser(userId);
  }
}
