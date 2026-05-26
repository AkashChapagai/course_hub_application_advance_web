import { db } from "../tools/db.js";

export function getAllModulesForAdmin() {
  return db.prepare(`
    SELECT
      modules.id,
      modules.title,
      modules.description,
      modules.imageUrl,
      modules.moduleLeaderId,
      staff.name AS moduleLeader,
      staff.email AS moduleLeaderEmail
    FROM modules
    LEFT JOIN staff ON modules.moduleLeaderId = staff.id
    ORDER BY modules.title
  `).all();
}

export function getModuleForAdminById(id) {
  return db.prepare(`
    SELECT
      id,
      title,
      description,
      imageUrl,
      moduleLeaderId
    FROM modules
    WHERE id = ?
  `).get(id);
}

export function createModule({
  title,
  description,
  imageUrl,
  moduleLeaderId,
}) {
  return db.prepare(`
    INSERT INTO modules (
      title,
      description,
      imageUrl,
      moduleLeaderId
    )
    VALUES (?, ?, ?, ?)
    RETURNING id
  `).get(
    title,
    description,
    imageUrl || null,
    moduleLeaderId || null,
  );
}

export function updateModule(id, {
  title,
  description,
  imageUrl,
  moduleLeaderId,
}) {
  db.prepare(`
    UPDATE modules
    SET
      title = ?,
      description = ?,
      imageUrl = ?,
      moduleLeaderId = ?
    WHERE id = ?
  `).run(
    title,
    description,
    imageUrl || null,
    moduleLeaderId || null,
    id,
  );
}

export function deleteModule(id) {
  db.prepare(`
    DELETE FROM modules
    WHERE id = ?
  `).run(id);
}