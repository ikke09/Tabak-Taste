import { z } from "zod";
import { tobaccoDTOSchema } from "./tobacco-dto";

const apiResultSchema = z.object({
  status: z.number().default(200),
  error: z.string().nullable(),
  data: z.array(tobaccoDTOSchema).nullable(),
});

type ApiResult = z.infer<typeof apiResultSchema>;

export default ApiResult;
