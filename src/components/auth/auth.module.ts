import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bull';
import { QueueConsumer } from './queue.consumer';

@Module({
  imports: [
    UserModule,
    BullModule.registerQueue({
      name: 'joinQueue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, QueueConsumer],
})
export class AuthModule {}
