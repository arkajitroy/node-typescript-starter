import { registerMail } from "./mail/registerMail.service";

export const services = {
  sendMail: {
    registerMail: registerMail,
  },
};
