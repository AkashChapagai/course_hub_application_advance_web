import { db } from "../tools/db.js";

function normaliseEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export function getInterestForProgrammeByEmail({ programmeId, studentEmail }) {
  return db.prepare(`
    SELECT
      id,
      programmeId,
      studentName,
      studentEmail,
      createdAt
    FROM interests
    WHERE programmeId = ?
      AND LOWER(TRIM(studentEmail)) = LOWER(TRIM(?))
    LIMIT 1
  `).get(programmeId, studentEmail);
}

export function createInterest({ programmeId, studentName, studentEmail }) {
  return db.prepare(`
    INSERT INTO interests (
      programmeId,
      studentName,
      studentEmail
    )
    VALUES (?, ?, ?)
    RETURNING id
  `).get(
    programmeId,
    studentName,
    normaliseEmail(studentEmail),
  );
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