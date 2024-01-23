import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';
import { TRANSACTION } from '../const/transaction';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(TRANSACTION.NAMESPACE);
    if (!nameSpace || !nameSpace.active) {
      throw new InternalServerErrorException(
        `${TRANSACTION.NAMESPACE} is not active`,
      );
    }
    return nameSpace.get(TRANSACTION.ENTITY_MANAGER);
  }
}
