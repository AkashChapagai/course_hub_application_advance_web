import { db } from "../tools/db.js";

db.exec(`
  PRAGMA foreign_keys = OFF;

  DROP TABLE IF EXISTS programme_modules;
  DROP TABLE IF EXISTS interests;
  DROP TABLE IF EXISTS sessions;
  DROP TABLE IF EXISTS files;
  DROP TABLE IF EXISTS programmes;
  DROP TABLE IF EXISTS modules;
  DROP TABLE IF EXISTS staff;
  DROP TABLE IF EXISTS users;

  PRAGMA foreign_keys = ON;

  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    hashedPassword TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  );

  CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    userId INTEGER NOT NULL,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    bytes BLOB NOT NULL
  );

  CREATE TABLE staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    email TEXT NOT NULL,
    bio TEXT
  );

  CREATE TABLE programmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL CHECK(level IN ('Undergraduate', 'Postgraduate')),
    description TEXT NOT NULL,
    imageUrl TEXT,
    published INTEGER NOT NULL DEFAULT 0,
    programmeLeaderId INTEGER,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (programmeLeaderId) REFERENCES staff(id)
  );

  CREATE TABLE modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT,
    moduleLeaderId INTEGER,
    FOREIGN KEY (moduleLeaderId) REFERENCES staff(id)
  );

  CREATE TABLE programme_modules (
    programmeId INTEGER NOT NULL,
    moduleId INTEGER NOT NULL,
    year INTEGER NOT NULL,
    PRIMARY KEY (programmeId, moduleId),
    FOREIGN KEY (programmeId) REFERENCES programmes(id) ON DELETE CASCADE,
    FOREIGN KEY (moduleId) REFERENCES modules(id) ON DELETE CASCADE
  );

  CREATE TABLE interests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    programmeId INTEGER NOT NULL,
    studentName TEXT NOT NULL,
    studentEmail TEXT NOT NULL,
    withdrawToken TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(programmeId, studentEmail),
    FOREIGN KEY (programmeId) REFERENCES programmes(id) ON DELETE CASCADE
  );
`);

console.log("Database initialised successfully.");