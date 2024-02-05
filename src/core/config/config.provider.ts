import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configurations, DBConfig, EmailConfig } from '.';

@Injectable()
export class ConfigProvider {
  constructor(private readonly configService: ConfigService<Configurations>) {}

  getDBConfig(): DBConfig {
    return this.configService.getOrThrow('DB');
  }

  getEmailConfig(): EmailConfig {
    return this.configService.getOrThrow('EMAIL');
  }
}
