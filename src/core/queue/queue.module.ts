import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueProducer } from './queue.producer';
import { QueueConsumer } from './queue.consumer';
import { MailModule } from 'src/modules/email/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'joinQueue',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    MailModule,
  ],
  providers: [QueueProducer, QueueConsumer],
  exports: [QueueProducer],
})
export class QueueModule {}
