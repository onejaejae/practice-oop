import { ValueTransformer } from 'typeorm';
import { UserStatus } from '../../../../common/type/user/userStatus';

export class UserStatusTransformer implements ValueTransformer {
  to(entityValue: UserStatus): string {
    if (!entityValue) {
      return null;
    }

    return entityValue.enumName;
  }

  from(databaseValue: string): UserStatus {
    if (!databaseValue) {
      return null;
    }

    return UserStatus.valueByName(databaseValue);
  }
}
