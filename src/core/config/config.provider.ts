import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Configurations, DBConfig, EmailConfig, JwtConfig } from '.';

@Injectable()
export class ConfigProvider {
  constructor(private readonly configService: ConfigService<Configurations>) {}

  getAppConfig(): AppConfig {
    return this.configService.getOrThrow('APP');
  }

  getDBConfig(): DBConfig {
    return this.configService.getOrThrow('DB');
  }

  getEmailConfig(): EmailConfig {
    return this.configService.getOrThrow('EMAIL');
  }

  getJwtConfig(): JwtConfig {
    return this.configService.getOrThrow('JWT');
  }
}
