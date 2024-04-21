import { duplicateEmailCheck, duplicateUsernameCheck } from './auth/duplicateChecks.service';
import { getUserInstanceByUsername } from './users/users.service';

export const services = {
  auth: {
    duplicateEmailCheck,
    duplicateUsernameCheck,
  },
  users: {
    getUserInstanceByUsername,
  },
};
