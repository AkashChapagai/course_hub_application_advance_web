import { db } from "../tools/db.js";
import { hashPassword, verifyPassword } from "../tools/hash.js";

export function getUserByUsername(username) {
  return db.prepare(`
    SELECT id, username, hashedPassword, role
    FROM users
    WHERE username = ?
  `).get(username);
}

export function getUserById(id) {
  return db.prepare(`
    SELECT id, username, role
    FROM users
    WHERE id = ?
  `).get(id);
}

export async function createUser({ username, password, role = "user" }) {
  const hashedPassword = await hashPassword(password);

  return db.prepare(`
    INSERT INTO users (username, hashedPassword, role)
    VALUES (?, ?, ?)
    RETURNING id, username, role
  `).get(username, hashedPassword, role);
}

export async function validateCredentials({ username, password }) {
  const user = getUserByUsername(username);

  if (!user) {
    return {
      ok: false,
      user: null,
      errors: {
        credentials: "Problem with username and/or password."
      }
    };
  }

  const passwordMatches = await verifyPassword(password, user.hashedPassword);

  if (!passwordMatches) {
    return {
      ok: false,
      user: null,
      errors: {
        credentials: "Problem with username and/or password."
      }
    };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    },
    errors: {}
  };
}