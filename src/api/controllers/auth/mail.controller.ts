import { StatusCodes } from 'http-status-codes';
import { predifinedEmails } from '../../../constants/mail';
import { Request, Response } from 'express';
import { MailGenerator, mailTransporter } from '../../../config/mail.config';
import { SENDERS_MAIL } from '../../../config/config';
import { SendMailOptions } from 'nodemailer';

export const registerEmail = async (req: Request, res: Response) => {
  try {
    const { username, userEmail, text, subject } = req.body;

    const mailStructure = {
      body: {
        name: username,
        intro: text || predifinedEmails.register.intro,
        outro: predifinedEmails.register.outro,
      },
    };

    const emailBody = MailGenerator.generate(mailStructure);

    const mailOptions: SendMailOptions = {
      from: SENDERS_MAIL,
      to: userEmail,
      subject: subject || 'Signup Successful',
      text: 'This is a test email sent from Nodemailer.',
      html: emailBody,
    };

    mailTransporter
      .sendMail(mailOptions)
      .then(() => {
        return res.status(StatusCodes.OK).send({
          message: 'Successfully mail has been sent!',
        });
      })
      .catch((error) =>
        res.status(StatusCodes.BAD_GATEWAY).send({
          error,
        }),
      );
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: 'Failed to generate Register Email',
    });
  }
};
