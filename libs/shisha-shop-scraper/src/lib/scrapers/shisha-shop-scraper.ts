import {
  PageInfo,
  TobaccosWithProducer,
  ScrapeOptions,
} from '@tabak-taste/types';

export interface ShishaShopScraper {
  scrapeSite(options: ScrapeOptions): Promise<TobaccosWithProducer>;
  retrieveShopInfos(): Promise<PageInfo>;
}
