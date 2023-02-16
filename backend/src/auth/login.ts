import { hashPassword } from '../utils/password';
import { createUser } from '../planetscale/database';

export async function signup(name:String, email:String, password:String) {
  // Hash the user's password
  const hashedPassword = await hashPassword(password);

  // Create the user in the database
  const user = await createUser(name, email, hashedPassword);

  return user;
}