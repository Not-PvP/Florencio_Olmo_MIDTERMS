// Run once: `npm run seed`
// Creates the database (if missing), the tables, and a demo user to log in with.
// There is no register endpoint in the spec, so this is how users get in.
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Client } from "pg";

dotenv.config();

const DB_NAME = process.env.PGDATABASE || "pulsedeskdb";
const DEMO_USERS = [
  { email: "admin@pulsedesk.com", password: "password123" },
  { email: "tech@pulsedesk.com", password: "password123" },
];

const connection = (database: string) =>
  new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT) || 5432,
    database,
  });

async function main() {
  // 1. create the database if it doesn't exist
  const admin = connection("postgres");
  await admin.connect();
  const exists = await admin.query("SELECT 1 FROM pg_database WHERE datname = $1", [DB_NAME]);
  if (exists.rows.length === 0) {
    await admin.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`Created database ${DB_NAME}`);
  }
  await admin.end();

  // 2. create tables + demo users
  const db = connection(DB_NAME);
  await db.connect();
  const schema = fs.readFileSync(path.join(__dirname, "..", "sql", "schema.sql"), "utf8");
  await db.query(schema);

  for (const u of DEMO_USERS) {
    const hash = await bcrypt.hash(u.password, 10);
    await db.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [u.email, hash]
    );
    console.log(`User ready: ${u.email} / ${u.password}`);
  }
  await db.end();
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
