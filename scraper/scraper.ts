import scrapeShishaDeluxe from "./shisha-deluxe-scraper";
import scrapeShishaWorld from "./shisha-world-scraper";
import { SITE } from "./types/site";
import Tobacco from "./types/tobacco";

const scrape = async (site: SITE): Promise<Tobacco[]> => {
  let data: Tobacco[] = [];
  switch (site) {
    case SITE.SHISHAWORLD:
      data = await scrapeShishaWorld(true);
    case SITE.SHISHADELUXE:
      data = await scrapeShishaDeluxe(true);
  }
  return data;
};
