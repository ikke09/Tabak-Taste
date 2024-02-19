import type { ProducerEntity } from '../db';
import { Prisma } from '@prisma/client';

const producerWithoutId = Prisma.validator<Prisma.ProducerDefaultArgs>()({
  select: { name: true, path: true },
});

type ProducerWithoutId = Prisma.ProducerGetPayload<typeof producerWithoutId>;

export { ProducerEntity, ProducerWithoutId };
