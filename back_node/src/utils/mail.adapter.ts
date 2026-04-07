import nodemailer from 'nodemailer';
import { MailHandler } from '../domain/AbstractModels';

export class MailHandlerAdapter implements MailHandler {

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  }

  async sendMail(from: string, to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({ from, to, subject, html });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
