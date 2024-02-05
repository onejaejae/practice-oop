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

export interface Configurations {
  DB: DBConfig;
  EMAIL: EmailConfig;
}
