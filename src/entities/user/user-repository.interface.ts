import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { User } from './user.entity';

export const UserRepositoryKey = 'UserRepositoryKey';

export interface IUserRepository extends GenericRepository<User> {}
