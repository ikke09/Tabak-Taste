import { z } from "zod";
import { tobaccoDTOSchema } from "./tobacco-dto";

const apiResultSchema = z.object({
  status: z.number().default(200),
  error: z.string().optional(),
  data: z.array(tobaccoDTOSchema).optional(),
});

type ApiResult = z.infer<typeof apiResultSchema>;

export default ApiResult;
