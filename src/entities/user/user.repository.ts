import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { EntityTarget } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserRepository
  extends GenericTypeOrmRepository<User>
  implements IUserRepository
{
  getName(): EntityTarget<User> {
    return User.name;
  }

  constructor(protected readonly txManager: TransactionManager) {
    super(User);
  }
}
