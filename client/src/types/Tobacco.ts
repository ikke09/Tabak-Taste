type TobaccoType = {
  id: string;
  producer: string;
  name: string;
  tastes: string[];
  source: string;
  ean: string;
  description: string;
};

type TobaccoListType = TobaccoType[];

type TobaccoProps = {
  model: TobaccoType;
};

type TobaccoListProps = {
  tobaccos: TobaccoListType;
};

export type { TobaccoType, TobaccoListType, TobaccoProps, TobaccoListProps };
