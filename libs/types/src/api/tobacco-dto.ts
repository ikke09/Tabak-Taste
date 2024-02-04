import { z } from "zod";

const TobaccoDTOSchema = z.object({
  id: z.number(),
  producer: z.string(),
  name: z.string(),
  tastes: z.array(z.string()),
  source: z.string(),
  ean: z.string().nullable(),
  description: z.string().nullable(),
});

type TobaccoDTO = z.infer<typeof TobaccoDTOSchema>;

export { TobaccoDTO, TobaccoDTOSchema };
