import { db } from "../tools/db.js";

export function getAllModulesForAdmin() {
  return db.prepare(`
    SELECT
      modules.id,
      modules.title,
      modules.description,
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
      moduleLeaderId
    FROM modules
    WHERE id = ?
  `).get(id);
}

export function createModule({
  title,
  description,
  moduleLeaderId
}) {
  return db.prepare(`
    INSERT INTO modules (
      title,
      description,
      moduleLeaderId
    )
    VALUES (?, ?, ?)
    RETURNING id
  `).get(
    title,
    description,
    moduleLeaderId || null
  );
}

export function updateModule(id, {
  title,
  description,
  moduleLeaderId
}) {
  db.prepare(`
    UPDATE modules
    SET
      title = ?,
      description = ?,
      moduleLeaderId = ?
    WHERE id = ?
  `).run(
    title,
    description,
    moduleLeaderId || null,
    id
  );
}

export function deleteModule(id) {
  db.prepare(`
    DELETE FROM modules
    WHERE id = ?
  `).run(id);
}