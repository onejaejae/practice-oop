import { Namespace, createNamespace, destroyNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { IAuthService } from '../interface/auth-service.interface';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { AuthService } from '../service/auth.service';
import { plainToInstance } from 'class-transformer';
import { UserStatus } from 'src/common/type/user/userStatus';
import { DatabaseModule } from 'test/factory/db/database.module';
import { Auth } from 'src/entities/auth/auth.entity';
import { createMock } from '@golevelup/ts-jest';
import { IJwtProvider } from 'src/core/jwt/jwt-providet.interface';
import { AuthRepository } from 'src/entities/auth/auth.repository';
import { IQueueProducer } from 'src/core/queue/queue-producer.interface';
import { TRANSACTION } from 'src/common/const/transaction';
import { SignInReq } from 'src/common/request/auth/signInReq';
import { Encrypt } from 'src/common/util/encrypt';

const mockActiveUser: User = plainToInstance(User, {
  email: 'user@test.com',
  name: 'test',
  password: 'password',
  status: UserStatus.ACTIVE,
});

const mockReadyUser: User = plainToInstance(User, {
  email: 'user@test.com',
  name: 'test',
  password: 'password',
  status: UserStatus.READY,
});

describe('auth service test', () => {
  let dataSource: DataSource;
  let service: IAuthService;
  let namespace: Namespace;

  beforeAll(async () => {
    dataSource = await DatabaseModule([User, Auth]);
    const txManager = new TransactionManager();

    const mockJwtProvider = createMock<IJwtProvider>();
    const mockQueueProducer = createMock<IQueueProducer>();
    const authRepository = new AuthRepository(txManager);
    const userRepository = new UserRepository(txManager);

    service = new AuthService(
      mockJwtProvider,
      authRepository,
      userRepository,
      mockQueueProducer,
    );
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

  describe('singIn method', () => {
    it('singIn - user가 존재하지 않는 경우', async () => {
      //given
      const loginDto = new SignInReq();
      loginDto.email = 'unExist';
      loginDto.password = 'invalid';

      const filters = { email: loginDto.email };

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(
            TRANSACTION.ENTITY_MANAGER,
            dataSource.createEntityManager(),
          );
          await service.singIn(loginDto);
        }),
      ).rejects.toThrow(new BadRequestException(`don't exist ${filters}`));
    });

    it('singIn - 이메일 인증을 완료하지 않은 경우', async () => {
      //given
      mockReadyUser.password = await Encrypt.createHash(mockReadyUser.password);
      const user = await dataSource.manager.save(User, mockReadyUser);

      const loginDto = new SignInReq();
      loginDto.email = user.email;
      loginDto.password = user.password;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(
            TRANSACTION.ENTITY_MANAGER,
            dataSource.createEntityManager(),
          );
          await service.singIn(loginDto);
        }),
      ).rejects.toThrow(new ForbiddenException('email 인증을 완료해주세요.'));
    });

    it('singIn - 입력한 비밀번호와 다른 경우', async () => {
      //given
      mockActiveUser.password = await Encrypt.createHash(
        mockActiveUser.password,
      );
      const user = await dataSource.manager.save(User, mockActiveUser);
      const loginDto = new SignInReq();
      loginDto.email = user.email;
      loginDto.password = 'difference';

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(
            TRANSACTION.ENTITY_MANAGER,
            dataSource.createEntityManager(),
          );
          await service.singIn(loginDto);
        }),
      ).rejects.toThrow(new BadRequestException('invalid password'));
    });

    it('singIn - 성공', async () => {
      //given
      const loginDto = new SignInReq();
      loginDto.email = mockActiveUser.email;
      loginDto.password = mockActiveUser.password;

      mockActiveUser.password = await Encrypt.createHash(
        mockActiveUser.password,
      );
      const user = await dataSource.manager.save(User, mockActiveUser);

      //when
      //then
      await expect(
        namespace.runAndReturn(async () => {
          namespace.set(
            TRANSACTION.ENTITY_MANAGER,
            dataSource.createEntityManager(),
          );
          return service.singIn(loginDto);
        }),
      ).resolves.not.toThrow();
    });
  });
});
