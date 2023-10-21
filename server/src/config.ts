import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  API_VERSION: z.string().optional().default("0.0.1"),
  API_PORT: z.coerce.number().optional().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().optional().default(27017),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_UI_USER: z.string(),
  DB_UI_PASSWORD: z.string(),
  DATABASE_URL: z.string().startsWith("mongodb://"),
});

const Config = configSchema.parse(process.env);

export default Config;
