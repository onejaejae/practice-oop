import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigProvider } from '../config/config.provider';
import { JwtProvider } from './jwt.provider';
import { JwtProviderKey } from './jwt-providet.interface';

const jwtProvider: ClassProvider = {
  provide: JwtProviderKey,
  useClass: JwtProvider,
};

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigProvider],
      useFactory: async (configService: ConfigProvider) => {
        const jwtConfig = configService.getJwtConfig();

        return {
          secret: jwtConfig.JWT_SECRET,
          signOptions: { expiresIn: jwtConfig.JWT_EXPIRATION_TIME },
        };
      },
    }),
  ],
  providers: [jwtProvider],
  exports: [jwtProvider],
})
export class JWTModule {}
