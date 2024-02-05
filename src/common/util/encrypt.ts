import * as argon2 from 'argon2';

export class Encrypt {
  static async createHash(value: string): Promise<string> {
    return argon2.hash(value);
  }

  static async isSameAsHash(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(plainPassword, hashedPassword);
  }
}
