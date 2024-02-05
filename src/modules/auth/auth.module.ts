import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bull';
import { QueueConsumer } from './queue.consumer';
import { MailModule } from '../email/mail.module';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UserModule,
    MailModule,
    BullModule.registerQueue({
      name: 'joinQueue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, QueueConsumer],
})
export class AuthModule {}