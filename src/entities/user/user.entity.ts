import { Column, Entity, OneToOne } from 'typeorm';
import { UserStatus } from '../../modules/user/type/userStatus';
import { UserStatusTransformer } from '../../modules/user/type/userStatusTransformer';
import { BaseEntity } from '../../core/database/typeorm/base.entity';
import { UserShowDto } from '../../modules/user/dto/userShowDto';
import { Encrypt } from 'src/common/util/encrypt';
import { Auth } from '../auth/auth.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    transformer: new UserStatusTransformer(),
    nullable: false,
  })
  status: UserStatus;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  accessToken: string | null;

  @OneToOne(() => Auth, (auth) => auth.User)
  Auth: Auth;

  static async signup(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.status = UserStatus.READY;
    user.password = await Encrypt.createHash(password);

    return user;
  }

  withoutPassword() {
    return new UserShowDto(this);
  }

  isRegistered() {
    return this.status.enumName === UserStatus.ACTIVE.enumName;
  }
}
