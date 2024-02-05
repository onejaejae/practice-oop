import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailForm } from './emailForm';
import { ConfigProvider } from 'src/core/config/config.provider';

@Injectable()
export class MailHelperProvider {
  private transporter;

  private generateURL(certificationKey: string) {
    return `http://localhost:3000/auth/verification?certificationKey=${certificationKey}`;
  }

  constructor(private readonly configProvider: ConfigProvider) {
    const emailConfig = this.configProvider.getEmailConfig();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailConfig.EMAIL_USER,
        pass: emailConfig.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(email: string, certificationKey: string) {
    try {
      return this.transporter.sendMail({
        to: email,
        from: 'noreplay@gmail.com',
        subject: '가입 인증 요청',
        html: emailForm(this.generateURL(certificationKey)),
      });
    } catch (error) {
      throw error;
    }
  }
}
