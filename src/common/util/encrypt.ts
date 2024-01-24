import { compare, hash } from 'bcryptjs';

export class Encrypt {
  static async createHash(value: string): Promise<string> {
    const saltOrRounds = 10;
    return hash(value, saltOrRounds);
  }

  static async isSameAsHash(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainPassword, hashedPassword);
  }
}
