import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailForm } from './emailForm';

@Injectable()
export class MailHelperProvider {
  private transporter;

  private generateURL(certificationKey: string) {
    return `http://localhost:3000/auth/verification?certificationKey=${certificationKey}`;
  }

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'magicnc7@gmail.com',
        pass: 'lken tdhg foym zvfw',
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
