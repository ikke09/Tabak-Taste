import { SITE } from './site';

export class ScraperError extends Error {
  #onSite: SITE;

  constructor(site: SITE, msg: string) {
    super(msg);
    this.#onSite = site;
    this.name = '[ScaperError]';
  }

  override get message(): string {
    return `${this.name} - Error while scraping ${this.#onSite}: ${
      this.message
    }`;
  }
}
