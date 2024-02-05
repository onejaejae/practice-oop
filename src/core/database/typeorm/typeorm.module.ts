import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigProvider } from 'src/core/config/config.provider';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const entityPath = path.join(__dirname + './../../../entities/*/*.entity.js');
export class TypeOrmModule {
  static forRoot(): DynamicModule {
    return OrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigProvider],
      useFactory: async (configService: ConfigProvider) => {
        const dbConfig = configService.getDBConfig();

        return {
          type: 'postgres',
          host: dbConfig.DB_HOST,
          port: Number(dbConfig.DB_PORT),
          database: dbConfig.DB_DATABASE,
          username: dbConfig.DB_USER_NAME,
          password: dbConfig.DB_PASSWORD,
          synchronize: process.env.NODE_ENV === 'dev',
          entities: [entityPath],
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
          extra: {
            max: 10,
          },
        };
      },
    });
  }
}

export const getTypeOrmModule = (): DynamicModule => {
  return TypeOrmModule.forRoot();
};
