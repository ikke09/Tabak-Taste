import { Producer, Prisma } from '@tabak-taste/db';

const producerWithoutId = Prisma.validator<Prisma.ProducerDefaultArgs>()({
  select: { name: true, path: true },
});

type ProducerWithoutId = Prisma.ProducerGetPayload<typeof producerWithoutId>;

export { Producer, ProducerWithoutId };
