import { Tobacco, Prisma } from '@tabak-taste/db';
import { ProducerWithoutId } from './producer';

const tobaccoWithoutId = Prisma.validator<Prisma.TobaccoDefaultArgs>()({
  select: {
    name: true,
    tastes: true,
    amount: true,
    unit: true,
    price: true,
    currency: true,
    source: true,
    description: true,
    ean: true,
  },
});

type TobaccoWithoutId = Prisma.TobaccoGetPayload<typeof tobaccoWithoutId>;

type TobaccoWithProducer = TobaccoWithoutId & {
  producer: ProducerWithoutId;
};

type Tobaccos = Tobacco[];

type TobaccosWithProducer = TobaccoWithProducer[];

export { Tobacco, TobaccoWithProducer, Tobaccos, TobaccosWithProducer };
