// Prisma 7 config — connection URLs live here (not in schema.prisma).
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prefer Next.js local env, then fall back to .env
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Transaction-mode pooler (IPv4) — app queries
    url: process.env["DATABASE_URL"],
    // Session-mode pooler — migrations / introspection
    ...(process.env["DIRECT_URL"]
      ? { directUrl: process.env["DIRECT_URL"] }
      : {}),
  },
});
