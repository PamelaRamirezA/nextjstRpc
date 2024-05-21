import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
      url: env.TURSO_CONNECTION_URL!,
      authToken: env.TURSO_AUTH_TOKEN!,
  },
  out: "./drizzle",
} satisfies Config;
