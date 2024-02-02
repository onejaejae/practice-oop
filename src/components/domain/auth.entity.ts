import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Type } from 'class-transformer';
import { UserStatus } from '../user/type/userStatus';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Auth extends BaseEntity {
  @Column('int', { nullable: true })
  userId: number | null;

  @Column({ type: 'varchar', length: 100, nullable: false })
  certificationKey: string;

  @OneToOne(() => User, (user) => user.Auth)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: User;

  static from(userId: number) {
    const auth = new Auth();
    auth.certificationKey = uuidv4();
    auth.userId = userId;
    return auth;
  }

  verification(certificationKey) {
    return this.certificationKey === certificationKey ? true : false;
  }

  setUserVerifiedStatus(user: User) {
    user.status = UserStatus.ACTIVE;
    return user;
  }
}

export class AuthJoinWithUser extends Auth {
  @Type(() => User)
  User: User;
}
