import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from 'src/core/database/base.repository';
import { EntityTarget } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { TransactionManager } from 'src/core/database/transaction.manager';

@Injectable()
export class UserRepository extends GenericTypeOrmRepository<User> {
  getName(): EntityTarget<User> {
    return User.name;
  }

  constructor(protected readonly txManager: TransactionManager) {
    super(User);
  }
}
