import { Injectable } from '@nestjs/common';
import { GenericTypeOrmRepository } from 'src/core/database/base.repository';
import { EntityTarget } from 'typeorm';
import { TransactionManager } from 'src/core/database/transaction.manager';
import { Auth, AuthJoinWithUser } from '../domain/auth.entity';
import { TransformPlainToInstance } from 'class-transformer';

@Injectable()
export class AuthRepository extends GenericTypeOrmRepository<Auth> {
  getName(): EntityTarget<Auth> {
    return Auth.name;
  }

  constructor(protected readonly txManager: TransactionManager) {
    super(Auth);
  }

  @TransformPlainToInstance(AuthJoinWithUser)
  async joinWithUser(filters: Partial<Auth>): Promise<AuthJoinWithUser> {
    const whereClause = Object.entries(filters)
      .map(([key]) => `auth.${key} =:${key}`)
      .join(' , ');

    return this.getQueryBuilder()
      .leftJoinAndSelect('auth.User', 'user')
      .where(whereClause, filters)
      .getOne();
  }
}
