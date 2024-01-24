import { Column, Entity } from 'typeorm';
import { UserStatus } from '../user/type/userStatus';
import { UserStatusTransformer } from '../user/type/userStatusTransformer';
import { BaseEntity } from './base.entity';
import { UserShowDto } from '../user/dto/userShowDto';
import { Encrypt } from 'src/common/util/encrypt';

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
}
