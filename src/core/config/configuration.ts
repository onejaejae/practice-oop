import { Configurations } from './index';

export const configurations = (): Configurations => {
  return {
    DB: {
      DB_HOST: process.env.DB_HOST,
      DB_USER_NAME: process.env.DB_USER_NAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_PORT: process.env.DB_PORT || 5432,
    },
    EMAIL: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
  };
};
