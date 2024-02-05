import { InternalServerErrorException } from '@nestjs/common';
import { createNamespace } from 'cls-hooked';
import { TransactionManager } from '../transaction.manager';
import { TRANSACTION } from 'src/common/const/transaction';
import { DatabaseModule } from 'test/factory/db/database.module';

describe('TransactionManager Test', () => {
  it('NameSpace가 없는 경우', () => {
    //given
    const manager = new TransactionManager();

    //when
    //then
    expect(() => manager.getEntityManager()).toThrow(
      new InternalServerErrorException(
        `${TRANSACTION.NAMESPACE} is not active`,
      ),
    );
  });

  it('NameSpace가 있지만 Active가 아닌 경우', () => {
    //given
    const manager = new TransactionManager();
    createNamespace(TRANSACTION.NAMESPACE);

    //when
    //then
    expect(() => manager.getEntityManager()).toThrow(
      new InternalServerErrorException(
        `${TRANSACTION.NAMESPACE} is not active`,
      ),
    );
  });

  it('정상 작동', async () => {
    //given
    const manager = new TransactionManager();
    const namespace = createNamespace(TRANSACTION.NAMESPACE);

    //when
    const dataSource = await DatabaseModule();
    const em = dataSource.createEntityManager();

    //when
    await namespace.runPromise(async () => {
      namespace.set(TRANSACTION.ENTITY_MANAGER, em);
      const got = manager.getEntityManager();
      expect(got).toStrictEqual(em);
    });
  });
});
