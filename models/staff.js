import { db } from "../tools/db.js";

export function getAllStaff() {
  return db.prepare(`
    SELECT id, name, title, email, bio
    FROM staff
    ORDER BY name
  `).all();
}