import { BullModule } from '@nestjs/bull';
import { ClassProvider, Module } from '@nestjs/common';
import { QueueProducer } from './queue.producer';
import { QueueConsumer } from './queue.consumer';
import { MailModule } from 'src/modules/email/mail.module';
import { QueueProducerKey } from './queue-producer.interface';

const queueProducer: ClassProvider = {
  provide: QueueProducerKey,
  useClass: QueueProducer,
};

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
  providers: [queueProducer, QueueConsumer],
  exports: [queueProducer],
})
export class QueueModule {}
