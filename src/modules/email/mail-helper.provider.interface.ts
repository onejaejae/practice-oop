export const MailHelperProviderkey = 'MailHelperProviderkey';

export interface IMailHelperProvider {
  sendMail(email: string, certificationKey: string);
}
