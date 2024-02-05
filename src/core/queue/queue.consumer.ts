import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import {
  IMailHelperProvider,
  MailHelperProviderkey,
} from 'src/modules/email/mail-helper.provider.interface';

@Processor('joinQueue')
export class QueueConsumer {
  constructor(
    @Inject(MailHelperProviderkey)
    private readonly mailHelperProvider: IMailHelperProvider,
  ) {}

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
