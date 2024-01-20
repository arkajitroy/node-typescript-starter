import bcrypt from "bcrypt";

export const generateHashedPassword = async (rawPassword: string): Promise<string> => {
  try {
    const saltRoundsValue = 15;
    const hashedPassword = bcrypt.hash(rawPassword, saltRoundsValue);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
