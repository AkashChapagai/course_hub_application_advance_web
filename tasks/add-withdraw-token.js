import { db } from "../tools/db.js";

function columnExists(tableName, columnName) {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all();

  return columns.some((column) => column.name === columnName);
}

if (!columnExists("interests", "withdrawToken")) {
  db.prepare(`
    ALTER TABLE interests
    ADD COLUMN withdrawToken TEXT
  `).run();

  console.log("Added withdrawToken column to interests table.");
} else {
  console.log("withdrawToken column already exists.");
}

const interestsWithoutToken = db.prepare(`
  SELECT id
  FROM interests
  WHERE withdrawToken IS NULL
     OR TRIM(withdrawToken) = ''
`).all();

for (const interest of interestsWithoutToken) {
  db.prepare(`
    UPDATE interests
    SET withdrawToken = ?
    WHERE id = ?
  `).run(crypto.randomUUID(), interest.id);
}

db.prepare(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_interests_withdrawToken
  ON interests(withdrawToken)
`).run();

console.log(`Updated ${interestsWithoutToken.length} interest record(s) with withdraw tokens.`);
console.log("Withdraw token migration completed successfully.");