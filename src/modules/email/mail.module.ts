import { ClassProvider, Module } from '@nestjs/common';
import { MailHelperProvider } from './mail-helper.provider';
import { MailHelperProviderkey } from './mail-helper.provider.interface';

const mailHelperProvider: ClassProvider = {
  provide: MailHelperProviderkey,
  useClass: MailHelperProvider,
};

@Module({
  providers: [mailHelperProvider],
  exports: [mailHelperProvider],
})
export class MailModule {}
