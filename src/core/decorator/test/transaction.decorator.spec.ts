import { InternalServerErrorException } from '@nestjs/common';
import { createNamespace } from 'cls-hooked';
import { Transactional } from '../transaction.decorator';
import { TRANSACTION } from 'src/common/const/transaction';
import { DatabaseModule } from 'test/factory/db/database.module';

class Mock {
  @Transactional()
  hello() {}
}

describe('Transactional Decorator Test', () => {
  it('NameSpace가 없이 실행되는 경우', async () => {
    //given
    const mock = new Mock();

    //when
    //then
    await expect(mock.hello()).rejects.toThrow(
      new InternalServerErrorException(
        `${TRANSACTION.NAMESPACE} is not active`,
      ),
    );
  });

  it('NameSpace는 있지만 active 되지 않은 경우', async () => {
    //given
    createNamespace(TRANSACTION.NAMESPACE);
    const mock = new Mock();

    //when
    //then
    await expect(mock.hello()).rejects.toThrow(
      new InternalServerErrorException(
        `${TRANSACTION.NAMESPACE} is not active`,
      ),
    );
  });

  it('entityManager가 없는 경우', async () => {
    //given
    const namespace = createNamespace(TRANSACTION.NAMESPACE);
    const mock = new Mock();

    //when
    //then
    await expect(
      namespace.runPromise(async () => Promise.resolve().then(mock.hello)),
    ).rejects.toThrow(
      new InternalServerErrorException(
        `Could not find EntityManager in ${TRANSACTION.NAMESPACE} nameSpace`,
      ),
    );
  });

  it('entityManager가 있는 경우 (정상)', async () => {
    //given
    const namespace = createNamespace(TRANSACTION.NAMESPACE);
    const mock = new Mock();

    const dataSource = await DatabaseModule();
    const em = dataSource.createEntityManager();

    await expect(
      namespace.runPromise(async () => {
        namespace.set(TRANSACTION.ENTITY_MANAGER, em);
        await Promise.resolve().then(mock.hello);
      }),
    ).resolves.not.toThrow();
  });
});
