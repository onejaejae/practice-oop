export interface AppConfig {
  PORT: string | number;
  BASE_URL: string;
}
export interface DBConfig {
  DB_HOST: string;
  DB_USER_NAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_PORT: number | string;
}

export interface EmailConfig {
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
}

export interface JwtConfig {
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
}

export interface Configurations {
  APP: AppConfig;
  DB: DBConfig;
  EMAIL: EmailConfig;
  JWT: JwtConfig;
}
