import { createTransport, Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 25,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public async sendEmail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: `${process.env.EMAIL_FROM_NAME!}`,
      to,
      subject,
      html,
    });
  }
}
