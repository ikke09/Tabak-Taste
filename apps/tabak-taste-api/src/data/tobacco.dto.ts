import {
  TobaccoDTO,
  TobaccoDTOSchema,
  TobaccoWithProducerEntity,
} from '@tabak-taste/types';

export const TobaccoDto = {
  convertFromEntity(entity: TobaccoWithProducerEntity): TobaccoDTO {
    const candidate: TobaccoDTO = {
      id: entity.id,
      producer: entity.producer.name,
      name: entity.name,
      tastes: entity.tastes,
      source: entity.source,
      description: entity.description,
      ean: entity.ean,
    };
    return TobaccoDTOSchema.parse(candidate);
  },
};
