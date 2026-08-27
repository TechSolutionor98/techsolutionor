// import Database from 'better-sqlite3';
// import path from 'path';
// import fs from 'fs';

// // Ensure data directory exists
// const dataDir = path.join(process.cwd(), 'data');
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// const dbPath = path.join(dataDir, 'applications.db');
// const db = new Database(dbPath);

// // Create table if not exists
// db.exec(`
//   CREATE TABLE IF NOT EXISTS applications (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT,
//     phone TEXT,
//     position TEXT,
//     info TEXT,
//     createdAt TEXT
//   )
// `);

// export function saveApplication({ name, email, phone, position, info }) {
//   const createdAt = new Date().toISOString();
//   const stmt = db.prepare(`INSERT INTO applications (name, email, phone, position, info, createdAt) VALUES (?, ?, ?, ?, ?, ?)`);
//   const infoRes = stmt.run(name, email, phone, position, info, createdAt);
//   return { id: infoRes.lastInsertRowid, name, email, phone, position, info, createdAt };
// }

// export function getApplications() {
//   const stmt = db.prepare(`SELECT id, name, email, phone, position, info, createdAt FROM applications ORDER BY id DESC`);
//   return stmt.all();
// }
