import { PrismaClient, Prisma } from '@tabak-taste/db-schema';
import { TobaccoDTO, ApiError, TobaccoDTOSchema } from '@tabak-taste/types';

export class TobaccoService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async findTobaccosWithProducer(
    query: string
  ): Promise<TobaccoDTO[] | ApiError> {
    if (!query || query.length === 0) {
      return new ApiError('/api/tobaccos', 'Bad request! Query must be given');
    }

    try {
      const tobaccoEntities = await this.db.tobacco.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        include: {
          producer: true,
        },
      });

      return tobaccoEntities.map((tobacco) => {
        const candidate: TobaccoDTO = {
            id: tobacco.id,
            producer: tobacco.producer.name,
            name: tobacco.name,
            tastes: tobacco.tastes,
            source: tobacco.source,
            description: tobacco.description,
            ean: tobacco.ean,
          };
        return TobaccoDTOSchema.parse(candidate);
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ApiError(
          '/api/tobaccos',
          `Searching for tobaccos failed with Code ${error.code}: ${error.message}`
        );
      }
      return new ApiError('/api/tobaccos', `Searching for tobaccos failed`);
    }
  }
}
