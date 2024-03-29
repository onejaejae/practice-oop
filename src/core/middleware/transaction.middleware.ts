import { Injectable, NestMiddleware } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { TRANSACTION } from '../../common/const/transaction';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}

  use(_req: Request, _res: Response, next: NextFunction) {
    const namespace =
      getNamespace(TRANSACTION.NAMESPACE) ??
      createNamespace(TRANSACTION.NAMESPACE);

    return namespace.runAndReturn(async () => {
      Promise.resolve()
        .then(() => {
          try {
            this.setEntityManager();
          } catch (error) {
            next(error);
          }
        })
        .then(next);
    });
  }

  private setEntityManager() {
    const namespace = getNamespace(TRANSACTION.NAMESPACE)!;
    namespace.set(TRANSACTION.ENTITY_MANAGER, this.em);
  }
}
