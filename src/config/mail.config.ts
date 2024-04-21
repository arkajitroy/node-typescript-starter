import Mailgen from 'mailgen';
import { SMTP_CONFIG_CREDENTIALS } from './config';
import { createTransport } from 'nodemailer';

export const nodeMailerConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_CONFIG_CREDENTIALS.email, // generated ethereal user
    pass: SMTP_CONFIG_CREDENTIALS.password, // generated ethereal password
  },
};

export const mailTransporter = createTransport(nodeMailerConfig);

export const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});
