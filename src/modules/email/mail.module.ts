import { Module } from '@nestjs/common';
import { MailHelperProvider } from './mail.helper.provider';

@Module({
  providers: [MailHelperProvider],
  exports: [MailHelperProvider],
})
export class MailModule {}
