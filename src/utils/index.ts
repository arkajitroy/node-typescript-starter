import { OTPGenerator } from "./OTPGenerator";
import { hashedPasswordCoverter } from "./hashedPasswordCoverter";

export const utility = {
  auth: {
    hashedPasswordCoverter: hashedPasswordCoverter,
    OTPGenerator: OTPGenerator,
  },
};
