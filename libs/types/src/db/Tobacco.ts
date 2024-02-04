import type { Tobacco, Prisma } from '@tabak-taste/db';

type TobaccoWithProducerEntity = Prisma.TobaccoGetPayload<{
  include: { producer: true };
}>;

export { Tobacco as TobaccoEntity, TobaccoWithProducerEntity };
