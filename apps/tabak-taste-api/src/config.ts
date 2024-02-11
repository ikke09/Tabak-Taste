import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  API_VERSION: z.string().optional().default('0.0.1'),
  API_PORT: z.coerce.number().optional().default(3000),
});

const Config = configSchema.parse(process.env);

export default Config;
