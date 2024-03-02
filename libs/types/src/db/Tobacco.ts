import type { Tobacco, Prisma } from '@tabak-taste/db-schema';

type TobaccoWithProducerEntity = Prisma.TobaccoGetPayload<{
  include: { producer: true };
}>;

export { Tobacco as TobaccoEntity, TobaccoWithProducerEntity };
