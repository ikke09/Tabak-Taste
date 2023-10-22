import { z } from "zod";
import { Prisma } from "@prisma/client";

const tobaccoDTOSchema = z.object({
  id: z.number(),
  producer: z.string(),
  name: z.string(),
  tastes: z.array(z.string()),
  source: z.string(),
  ean: z.string().nullable(),
  description: z.string().nullable(),
});

type TobaccoDTO = z.infer<typeof tobaccoDTOSchema>;
type SearchTobaccosWithProducerResult = Prisma.TobaccoGetPayload<{
  include: { producer: true };
}>;

const toDTO = (
  tobaccoWithProducer: SearchTobaccosWithProducerResult
): TobaccoDTO => {
  return tobaccoDTOSchema.parse({
    ...tobaccoWithProducer,
    producer: tobaccoWithProducer.producer.name,
  });
};

export { TobaccoDTO, tobaccoDTOSchema, toDTO };
