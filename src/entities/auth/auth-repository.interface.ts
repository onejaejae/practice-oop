import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Auth, AuthJoinWithUser } from './auth.entity';

export const AuthRepositoryKey = 'AuthRepositoryKey';

export interface IAuthRepository extends GenericRepository<Auth> {
  joinWithUser(filters: Partial<Auth>): Promise<AuthJoinWithUser>;
}
