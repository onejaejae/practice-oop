import { Namespace, createNamespace, destroyNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { DatabaseModule } from 'test/factory/db/database.module';
import { Auth } from 'src/entities/auth/auth.entity';
import { TRANSACTION } from 'src/common/const/transaction';
import { UserFactory } from 'test/factory/user/user.factory';
import { UserService } from '../service/user.service';
import { IUserService } from '../interface/user-service.interface';
import { UserShowDto } from 'src/common/response/user/userShowDto';

describe('auth service test', () => {
  let dataSource: DataSource;
  let service: IUserService;
  let namespace: Namespace;
  let userFactory: UserFactory;

  beforeAll(async () => {
    dataSource = await DatabaseModule([User, Auth]);
    const txManager = new TransactionManager();
    const userRepository = new UserRepository(txManager);

    service = new UserService(userRepository);
    userFactory = new UserFactory();
  });

  beforeEach(() => {
    namespace = createNamespace(TRANSACTION.NAMESPACE);
  });

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE auth CASCADE;');
    await dataSource.query('TRUNCATE TABLE users CASCADE;');
    await dataSource.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    destroyNamespace(TRANSACTION.NAMESPACE);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('Should be defined', () => {
    expect(dataSource).toBeDefined();
    expect(namespace).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getUser method', () => {
    it('user가 존재하지 않는 경우 - 실패', async () => {
      //given
      const unExistUserId = 1000000;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(
            TRANSACTION.ENTITY_MANAGER,
            dataSource.createEntityManager(),
          );
          await service.getUser(unExistUserId);
        }),
      ).rejects.toThrow(
        new BadRequestException(`don't exist ${unExistUserId}`),
      );
    });

    it('단일 유저 조회 성공', async () => {
      //given
      const mockReadyUser = await userFactory.mockReadyUserWithHashedPassword();
      const user = await dataSource.manager.save(User, mockReadyUser);

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(
          TRANSACTION.ENTITY_MANAGER,
          dataSource.createEntityManager(),
        );
        return service.getUser(user.id);
      });

      //then
      expect(result).toBeInstanceOf(UserShowDto);
      expect(result.email).toBe(mockReadyUser.email);
      expect(result.name).toBe(mockReadyUser.name);
      expect(result.status).toBe(mockReadyUser.status.enumName);
    });
  });
});
