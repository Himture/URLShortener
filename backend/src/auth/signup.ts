import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/password";
import { getUserByEmail } from "../planetscale/database";

export async function login(email: String, password: String) {
  // Get the user from the database
  const user = await getUserByEmail(email);

  let secret = process.env["JWT_SECRET"];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify the password
  const passwordMatch = await verifyPassword(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Sign the JWT token with user id and secret
  const token = jwt.sign({ userId: user.id }, secret as string);

  return token;
}
