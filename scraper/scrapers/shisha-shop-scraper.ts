import { PageInfo, Tobaccos, ScrapeOptions } from "../types";

export interface ShishaShopScraper {
  scrapeSite(options: ScrapeOptions): Promise<Tobaccos>;
  retrieveShopInfos(): Promise<PageInfo>;
}
