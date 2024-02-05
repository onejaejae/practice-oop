import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BullModule } from '@nestjs/bull';
import { QueueConsumer } from './queue.consumer';
import { MailModule } from '../email/mail.module';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { AuthRepositoryModule } from 'src/entities/auth/auth-repository.module';

@Module({
  imports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    MailModule,
    BullModule.registerQueue({
      name: 'joinQueue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, QueueConsumer],
})
export class AuthModule {}
