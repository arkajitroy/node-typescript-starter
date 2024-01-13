import { duplicateEmailCheck, duplicateUsernameCheck } from "./auth/auth.service";
import { registerMail } from "./mail/registerMail.service";

export const services = {
  user: {
    duplicateUsernameCheck: duplicateUsernameCheck,
    duplicateEmailCheck: duplicateEmailCheck,
  },
  sendMail: {
    registerMail: registerMail,
  },
};
