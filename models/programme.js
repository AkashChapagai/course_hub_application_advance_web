import { db } from "../tools/db.js";

export function getPublishedProgrammes() {
  return db.prepare(`
    SELECT
      programmes.id,
      programmes.title,
      programmes.level,
      programmes.description,
      programmes.imageUrl,
      programmes.published,
      staff.name AS programmeLeader
    FROM programmes
    LEFT JOIN staff ON programmes.programmeLeaderId = staff.id
    WHERE programmes.published = 1
    ORDER BY programmes.level, programmes.title
  `).all();
}

export function getPublishedProgrammeById(id) {
  return db.prepare(`
    SELECT
      programmes.id,
      programmes.title,
      programmes.level,
      programmes.description,
      programmes.imageUrl,
      programmes.published,
      staff.name AS programmeLeader,
      staff.email AS programmeLeaderEmail,
      staff.bio AS programmeLeaderBio
    FROM programmes
    LEFT JOIN staff ON programmes.programmeLeaderId = staff.id
    WHERE programmes.id = ? AND programmes.published = 1
  `).get(id);
}

export function getModulesForProgramme(programmeId) {
  return db.prepare(`
    SELECT
      modules.id,
      modules.title,
      modules.description,
      modules.imageUrl,
      programme_modules.year,
      staff.name AS moduleLeader,
      staff.email AS moduleLeaderEmail
    FROM programme_modules
    INNER JOIN modules ON programme_modules.moduleId = modules.id
    LEFT JOIN staff ON modules.moduleLeaderId = staff.id
    WHERE programme_modules.programmeId = ?
    ORDER BY programme_modules.year, modules.title
  `).all(programmeId);
}

export function getAllProgrammesForAdmin() {
  return db.prepare(`
    SELECT
      programmes.id,
      programmes.title,
      programmes.level,
      programmes.description,
      programmes.imageUrl,
      programmes.published,
      staff.name AS programmeLeader
    FROM programmes
    LEFT JOIN staff ON programmes.programmeLeaderId = staff.id
    ORDER BY programmes.published ASC, programmes.level, programmes.title
  `).all();
}

export function getProgrammeForAdminById(id) {
  return db.prepare(`
    SELECT
      id,
      title,
      level,
      description,
      imageUrl,
      published,
      programmeLeaderId
    FROM programmes
    WHERE id = ?
  `).get(id);
}

export function createProgramme({
  title,
  level,
  description,
  imageUrl,
  programmeLeaderId,
  published,
}) {
  return db.prepare(`
    INSERT INTO programmes (
      title,
      level,
      description,
      imageUrl,
      programmeLeaderId,
      published
    )
    VALUES (?, ?, ?, ?, ?, ?)
    RETURNING id
  `).get(
    title,
    level,
    description,
    imageUrl || null,
    programmeLeaderId || null,
    published ? 1 : 0,
  );
}

export function updateProgramme(id, {
  title,
  level,
  description,
  imageUrl,
  programmeLeaderId,
  published,
}) {
  db.prepare(`
    UPDATE programmes
    SET
      title = ?,
      level = ?,
      description = ?,
      imageUrl = ?,
      programmeLeaderId = ?,
      published = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title,
    level,
    description,
    imageUrl || null,
    programmeLeaderId || null,
    published ? 1 : 0,
    id,
  );
}

export function deleteProgramme(id) {
  db.prepare(`
    DELETE FROM programmes
    WHERE id = ?
  `).run(id);
}

export function publishProgramme(id) {
  db.prepare(`
    UPDATE programmes
    SET
      published = 1,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
}

export function unpublishProgramme(id) {
  db.prepare(`
    UPDATE programmes
    SET
      published = 0,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
}

export function getProgrammeModulesForAdmin(programmeId) {
  return db.prepare(`
    SELECT
      programme_modules.programmeId,
      programme_modules.moduleId,
      programme_modules.year,
      modules.title,
      modules.description,
      modules.imageUrl,
      staff.name AS moduleLeader
    FROM programme_modules
    INNER JOIN modules ON programme_modules.moduleId = modules.id
    LEFT JOIN staff ON modules.moduleLeaderId = staff.id
    WHERE programme_modules.programmeId = ?
    ORDER BY programme_modules.year, modules.title
  `).all(programmeId);
}

export function attachModuleToProgramme({ programmeId, moduleId, year }) {
  db.prepare(`
    INSERT OR REPLACE INTO programme_modules (
      programmeId,
      moduleId,
      year
    )
    VALUES (?, ?, ?)
  `).run(programmeId, moduleId, year);
}

export function removeModuleFromProgramme({ programmeId, moduleId }) {
  db.prepare(`
    DELETE FROM programme_modules
    WHERE programmeId = ? AND moduleId = ?
  `).run(programmeId, moduleId);
}