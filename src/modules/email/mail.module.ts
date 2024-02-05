import { Module } from '@nestjs/common';
import { MailHelperProvider } from './mail.helper.provider';

@Module({
  imports: [],
  providers: [MailHelperProvider],
  exports: [MailHelperProvider],
})
export class MailModule {}
