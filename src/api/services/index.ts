import { duplicateEmailCheck, duplicateUsernameCheck } from "./auth/auth.service";
import { generateHashedPassword } from "./auth/password.service";
import { registerMail } from "./mail/registerMail.service";
import { getUserInstanceByUsername } from "./users/users.service";

export const services = {
  users: {
    duplicateUsernameCheck: duplicateUsernameCheck,
    duplicateEmailCheck: duplicateEmailCheck,
    getUserInstanceByUsername: getUserInstanceByUsername,
  },
  sendMail: {
    registerMail: registerMail,
  },
  password: {
    generateHashedPassword: generateHashedPassword,
  },
};
