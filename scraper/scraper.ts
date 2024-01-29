import {
  ShishaShopScraper,
  ShishaDeluxeScraper,
  ShishaWorldScraper,
} from "./scrapers";
import { PageInfo, SITE, ScraperError, ScrapeOptions, Tobaccos } from "./types";

export class Scraper {
  #site: SITE;
  #scraper: ShishaShopScraper;
  #config: ScrapeOptions;

  constructor(site: SITE, config: ScrapeOptions) {
    this.#site = site;
    this.#config = config;
    switch (site) {
      case SITE.SHISHAWORLD:
        this.#scraper = new ShishaWorldScraper();
      case SITE.SHISHADELUXE:
        this.#scraper = new ShishaDeluxeScraper();
      default:
        throw new ScraperError(site, `No scraper for ${this.#site} available`);
    }
  }

  set config(config: ScrapeOptions) {
    this.#config = config;
  }

  get config(): ScrapeOptions {
    return this.#config;
  }

  get site(): SITE {
    return this.#site;
  }

  get pageInfo(): Promise<PageInfo> {
    return (async () => {
      return await this.#scraper.retrieveShopInfos();
    })();
  }

  get tobaccos(): Promise<Tobaccos> {
    return (async () => {
      return await this.#scraper.scrapeSite(this.#config);
    })();
  }
}