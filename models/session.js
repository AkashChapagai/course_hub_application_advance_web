import { db } from "../tools/db.js";

export function createSession(userId) {
  const id = crypto.randomUUID();

  db.prepare(`
    INSERT INTO sessions (id, userId)
    VALUES (?, ?)
  `).run(id, userId);

  return id;
}

export function getSession(id) {
  return db.prepare(`
    SELECT
      sessions.id,
      sessions.userId,
      sessions.createdAt,
      users.username,
      users.role
    FROM sessions
    INNER JOIN users ON sessions.userId = users.id
    WHERE sessions.id = ?
  `).get(id);
}

export function deleteSession(id) {
  db.prepare(`
    DELETE FROM sessions
    WHERE id = ?
  `).run(id);
}