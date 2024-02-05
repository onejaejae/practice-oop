import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IQueueProducer } from './queue-producer.interface';

export class QueueProducer implements IQueueProducer {
  constructor(
    @InjectQueue('joinQueue')
    private joinQueue: Queue,
  ) {}

  async mailSend(email: string, certificationKey: string): Promise<void> {
    await this.joinQueue.add(
      'mail-send',
      { email, certificationKey },
      { removeOnComplete: true },
    );
  }
}
