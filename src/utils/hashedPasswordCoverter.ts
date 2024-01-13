import bcrypt from "bcrypt";

export const hashedPasswordCoverter = async (
  password: string
): Promise<String> => {
  const _hashedPassword = await bcrypt.hash(password, 10);
  return _hashedPassword;
};
