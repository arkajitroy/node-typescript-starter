import { Request, Response } from "express";
import { MailGenerator, mailTransporter } from "../../../config/email.config";
import { StatusCodes } from "http-status-codes";
import { SMTP_CONFIG_CREDENTIALS } from "../../../config/config";

export const registerMail = async (req: Request, res: Response) => {
  const { username, userEmail, text, subject } = req.body;

  const email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = MailGenerator.generate(email);

  const message = {
    from: SMTP_CONFIG_CREDENTIALS.email,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // send mail
  mailTransporter
    .sendMail(message)
    .then(() => {
      return res
        .status(StatusCodes.OK)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error: Error) => res.status(500).send({ message: error.message }));
};
