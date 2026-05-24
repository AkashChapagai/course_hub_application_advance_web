import { db } from "../tools/db.js";

export function createInterest({ programmeId, studentName, studentEmail }) {
  return db.prepare(`
    INSERT INTO interests (programmeId, studentName, studentEmail)
    VALUES (?, ?, ?)
    RETURNING id
  `).get(programmeId, studentName, studentEmail);
}

export function getInterestById(id) {
  return db.prepare(`
    SELECT
      interests.id,
      interests.studentName,
      interests.studentEmail,
      interests.createdAt,
      programmes.title AS programmeTitle,
      programmes.level AS programmeLevel
    FROM interests
    INNER JOIN programmes ON interests.programmeId = programmes.id
    WHERE interests.id = ?
  `).get(id);
}
export function getAllInterestsForAdmin() {
  return db.prepare(`
    SELECT
      interests.id,
      interests.studentName,
      interests.studentEmail,
      interests.createdAt,
      programmes.id AS programmeId,
      programmes.title AS programmeTitle,
      programmes.level AS programmeLevel
    FROM interests
    INNER JOIN programmes ON interests.programmeId = programmes.id
    ORDER BY interests.createdAt DESC
  `).all();
}

export function getInterestsForProgramme(programmeId) {
  return db.prepare(`
    SELECT
      interests.id,
      interests.studentName,
      interests.studentEmail,
      interests.createdAt,
      programmes.id AS programmeId,
      programmes.title AS programmeTitle,
      programmes.level AS programmeLevel
    FROM interests
    INNER JOIN programmes ON interests.programmeId = programmes.id
    WHERE interests.programmeId = ?
    ORDER BY interests.createdAt DESC
  `).all(programmeId);
}

export function deleteInterest(id) {
  db.prepare(`
    DELETE FROM interests
    WHERE id = ?
  `).run(id);
}