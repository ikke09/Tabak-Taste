import { z } from 'zod';
import { TobaccoDTOSchema } from './tobacco-dto';

const apiResultSchema = z.object({
  status: z.number().default(200),
  error: z.string().optional(),
  data: z.array(TobaccoDTOSchema).nullable(),
});

export type ApiResult = z.infer<typeof apiResultSchema>;
