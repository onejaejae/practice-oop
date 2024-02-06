import { hash, verify } from 'argon2';

export class Encrypt {
  static async createHash(value: string): Promise<string> {
    return hash(value);
  }

  static async isSameAsHash(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return verify(hashedPassword, plainPassword);
  }
}
