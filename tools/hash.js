const secret = "student-course-hub-secret-value";

const options = {
  name: "PBKDF2",
  hash: "SHA-256",
  iterations: 100000,
  salt: new TextEncoder().encode(secret)
};

export async function hashPassword(password) {
  const inputBytes = new TextEncoder().encode(password);

  const key = await crypto.subtle.importKey(
    "raw",
    inputBytes,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const buffer = await crypto.subtle.deriveBits(options, key, 256);

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(password, storedHash) {
  const candidateHash = await hashPassword(password);

  return candidateHash === storedHash;
}