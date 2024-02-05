import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/components/domain/auth.entity';
import { User } from 'src/components/domain/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TransactionMiddleware } from '../middleware/transaction.middleware';
import { TransactionManager } from './transaction.manager';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        return {
          type: 'postgres',
          host: 'db',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test',
          entities: [User, Auth],
          synchronize: false,
          logging: false,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
  ],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
