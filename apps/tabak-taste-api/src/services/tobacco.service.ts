import { PrismaClient, Prisma } from '@prisma/client';
import { TobaccoDTO, ApiError } from '@tabak-taste/types';
import { TobaccoDto } from '../data/tobacco.dto';

export class TobaccoService {
  private readonly db: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.db = prismaClient;
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

      return tobaccoEntities.map((tobacco) =>
        TobaccoDto.convertFromEntity(tobacco)
      );
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
