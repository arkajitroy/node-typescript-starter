type OtpOptions = {
  length: number;
  alphanumeric: boolean;
  uppercase: boolean;
  specialChars: boolean;
};

const defaultOtpOptions: OtpOptions = {
  length: 6,
  alphanumeric: false,
  uppercase: false,
  specialChars: false,
};

export const OTPGenerator = (options: Partial<OtpOptions> = {}): string => {
  const { length, alphanumeric, uppercase, specialChars } = { ...defaultOtpOptions, ...options };

  let characters = "0123456789";

  if (alphanumeric) {
    characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (specialChars) {
    characters += "!@#$%^&*()-=_+[]{}|;:,.<>?";
  }

  if (uppercase) {
    characters = characters.replace(/[a-z]/g, ""); // Remove lowercase letters if uppercase is not required
  }

  let otp = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    otp += characters.charAt(randomIndex);
  }

  return otp;
};
