import { UserStatus } from 'src/common/type/user/userStatus';
import { UserStatusTransformer } from '../transformer/userStatusTransformer';

describe('UserStatusTransformer test', () => {
  let userStatusTransformer: UserStatusTransformer;

  beforeAll(() => {
    userStatusTransformer = new UserStatusTransformer();
  });

  it('should transform UserStatus to string', () => {
    const status = UserStatus.ACTIVE;
    const result = userStatusTransformer.to(status);

    expect(result).toBe(status.enumName);
  });

  it('should transform string to UserStatus', () => {
    const status = 'ACTIVE';
    const transformedItemType = userStatusTransformer.from(status);
    const expectedStatus = UserStatus.valueByName(status);

    expect(transformedItemType).toBe(expectedStatus);
  });
});
