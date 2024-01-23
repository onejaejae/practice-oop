import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('joinQueue')
export class QueueConsumer {
  constructor() {}

  @Process('mail-send')
  async handleAddJoinQueue(job: Job) {
    const userId = job.data.userId;
    console.log('job', job);
  }
}
