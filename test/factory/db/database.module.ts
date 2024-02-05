import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export const DatabaseModule = async (entities: Array<any> = []) => {
  if (process.env.NODE_ENV === 'local') {
    const container = await new PostgreSqlContainer().start();
    return await new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      username: container.getUsername(),
      password: container.getPassword(),
      synchronize: true,
      entities: [...entities],
      namingStrategy: new SnakeNamingStrategy(),
    }).initialize();
  }

  return await new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    database: 'test',
    username: 'test',
    password: 'test',
    synchronize: true,
    entities: [...entities],
    namingStrategy: new SnakeNamingStrategy(),
  }).initialize();
};
