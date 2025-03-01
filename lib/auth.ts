import crypto from "crypto";

// In a real application, this would be stored in a database
const users = [
  {
    username: "admin",
    // This is a hashed version of 'password123'
    passwordHash:
      "8f6a5c503f42b33fd0272d39c1820b5a32cb8b8e3aba5d3244eb0c3332448c38",
  },
];

// Secret key for encryption (in a real app, this would be an environment variable)
const SECRET_KEY = "your-secret-key-for-encryption";

// Function to encrypt a password
export function encryptPassword(password: string): string {
  const hash = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(password)
    .digest("hex");
  return hash;
}

// Function to authenticate a user
export async function authenticateUser(
  username: string,
  password: string
): Promise<boolean> {
  // In a real app, this would query a database
  const user = users.find((u) => u.username === username);

  if (!user) {
    return false;
  }

  const passwordHash = encryptPassword(password);
  return passwordHash === user.passwordHash;
}
