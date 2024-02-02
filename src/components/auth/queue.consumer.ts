import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailHelperProvider } from '../email/mail.helper.provider';

@Processor('joinQueue')
export class QueueConsumer {
  constructor(private readonly mailHelperProvider: MailHelperProvider) {}

  @Process('mail-send')
  async handleAddJoinQueue(job: Job) {
    const email = job.data.email as string;
    const certificationKey = job.data.certificationKey as string;

    return await this.mailHelperProvider.sendMail(email, certificationKey);
  }

  @OnQueueFailed()
  handler(job: Job, error: Error) {
    // todo log
    console.error('eeee', error);
  }
}
