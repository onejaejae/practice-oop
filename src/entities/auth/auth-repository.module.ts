import { ClassProvider, Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthRepositoryKey } from './auth-repository.interface';

export const authRepository: ClassProvider = {
  provide: AuthRepositoryKey,
  useClass: AuthRepository,
};

@Module({
  providers: [authRepository],
  exports: [authRepository],
})
export class AuthRepositoryModule {}
