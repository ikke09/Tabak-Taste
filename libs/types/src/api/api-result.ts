import { z } from 'zod';
import { TobaccoDTOSchema } from './tobacco-dto';
import { ApiError } from './apiError';

const apiResultSchema = z.object({
  status: z.number().default(200),
  error: z.custom<ApiError>(),
  data: z.array(TobaccoDTOSchema).nullable(),
});

export type ApiResult = z.infer<typeof apiResultSchema>;
