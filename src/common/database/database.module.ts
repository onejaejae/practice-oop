import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/components/domain/auth.entity';
import { User } from 'src/components/domain/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
          synchronize: true,
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
    };
  }
}
