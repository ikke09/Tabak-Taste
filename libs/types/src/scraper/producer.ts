import type { ProducerEntity } from '../db';
import { Prisma } from '@tabak-taste/db-schema';

const producerWithoutId = Prisma.validator<Prisma.ProducerDefaultArgs>()({
  select: { name: true, path: true },
});

type ProducerWithoutId = Prisma.ProducerGetPayload<typeof producerWithoutId>;

export { ProducerEntity, ProducerWithoutId };
