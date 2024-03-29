import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("🚨 no database url");
}

const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    await migrate(db, { migrationsFolder: "migrationss" });
  } catch {
    console.log("🚨 Error migrating client");
  }
};

migrateDb();
export default db;
