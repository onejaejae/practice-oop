import { UserShowDto } from 'src/common/response/user/userShowDto';

export const UserServiceKey = 'UserServiceKey';

export interface IUserService {
  getUser(userId: number): Promise<UserShowDto>;
}
