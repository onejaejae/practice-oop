import { plainToInstance } from 'class-transformer';
import { UserStatus } from 'src/common/type/user/userStatus';
import { Encrypt } from 'src/common/util/encrypt';
import { User } from 'src/entities/user/user.entity';

export class UserFactory {
  mockReadyUser() {
    return plainToInstance(User, {
      email: 'user@test.com',
      name: 'test',
      password: 'password',
      status: UserStatus.READY,
    });
  }

  async mockReadyUserWithHashedPassword() {
    const hashedPassword = await Encrypt.createHash('password');

    return plainToInstance(User, {
      email: 'user@test.com',
      name: 'test',
      password: hashedPassword,
      status: UserStatus.READY,
    });
  }

  mockActiveUser() {
    return plainToInstance(User, {
      email: 'user@test.com',
      name: 'test',
      password: 'password',
      status: UserStatus.ACTIVE,
    });
  }

  async mockActiveUserWithHashedPassword(password: string) {
    const hashedPassword = await Encrypt.createHash(password);

    return plainToInstance(User, {
      email: 'user@test.com',
      name: 'test',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
    });
  }
}
