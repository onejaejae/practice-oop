import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailHelperProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'email',
        pass: 'password',
      },
    });
  }

  async sendMail(email: string) {
    try {
      await this.transporter.sendMail({
        to: email,
        from: 'noreplay@gmail.com',
        subject: 'Hello',
        text: 'Hello World',
        html: '<b>Hello World</b>',
      });
    } catch (error) {
      throw error;
    }
  }
}
