import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConModule } from '@nestjs/config';
import { configurations } from './configuration';
import { ConfigProvider } from './config.provider';

@Global()
@Module({
  imports: [
    ConModule.forRoot({
      envFilePath: [`dotenv/.env.${process.env.NODE_ENV}`],
      load: [configurations],
    }),
  ],
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
