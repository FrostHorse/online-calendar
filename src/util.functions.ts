import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
}

export async function validatePassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
