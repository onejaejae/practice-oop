import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/entities/user/user.entity';
import { UserStatus } from '../../type/user/userStatus';

export class UserShowDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _status: UserStatus;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;

  constructor(user: User) {
    this._id = user.id;
    this._status = user.status;
    this._email = user.email;
    this._name = user.name;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get status(): string {
    return this._status.enumName;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }

  @Expose()
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
