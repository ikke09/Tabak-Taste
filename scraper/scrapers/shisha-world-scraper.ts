import * as cheerio from "cheerio";
import axios from "axios";

import { ShishaWorldRequestOptions } from "../constants/shisha-world.constants";
import { ShishaShopScraper } from "./shisha-shop-scraper";
import {
  Tobaccos,
  Tobacco,
  SITE,
  PageInfo,
  Producer,
  ScraperError,
  ScrapeOptions,
} from "../types";

export class ShishaWorldScraper implements ShishaShopScraper {
  async #loadTobaccosFromProducer(producer: Producer): Promise<Tobaccos> {
    try {
      const producerPageRequestOptions = {
        ...ShishaWorldRequestOptions,
        url: `${producer.path}`,
        params: {
          ...ShishaWorldRequestOptions.params,
          o: 2,
          f: 4,
        },
      };
      const response = await axios(producerPageRequestOptions);
      if (response.status !== 200) throw new Error(response.statusText);
      const $ = cheerio.load(response.data);

      const allTobaccosContainer = $("div.listing--container");
      const products = allTobaccosContainer.find("a.product--title").toArray();
      return products.map((link) => {
        const source = $(link).attr("href");
        return <Tobacco>{ producer: producer.name, source };
      });
    } catch (error: unknown) {
      console.error(`Failed loading from ${producer}`, error);
      throw new ScraperError(
        SITE.SHISHAWORLD,
        `Failed to load tobaccos from Producer ${producer}`
      );
    }
  }

  async #loadTobaccoDetails(tobacco: Tobacco): Promise<Tobacco> {
    try {
      const detailRequestOptions = {
        ...ShishaWorldRequestOptions,
        url: `${tobacco.source.replace(ShishaWorldRequestOptions.baseURL, "")}`,
        params: {},
      };
      const response = await axios(detailRequestOptions);
      if (response.status !== 200) throw new Error(response.statusText);
      const $ = cheerio.load(response.data);

      const amountWithUnit = $(
        'td.product--properties-label:contains("Inhalt")'
      )
        .next()
        .text();
      const { 1: amount, 2: unit } = amountWithUnit.split(
        new RegExp("(\\d+)", "g")
      );
      tobacco.amount = Number(amount);
      tobacco.unit = unit;

      tobacco.ean = $('td.product--properties-label:contains("EAN")')
        .next()
        .text();

      const tastesString = $('td.product--properties-label:contains("Aroma")')
        .next()
        .text();
      tobacco.tastes = tastesString.split(",").map((t) => t.trim());

      const priceWithCurrency = $("span.price--content").text().trim();
      const { 0: price, 2: currency } = priceWithCurrency.split(
        new RegExp("(\\s)", "g")
      );
      tobacco.price = Number(price.replace(",", "."));
      tobacco.currency = currency;

      const title = $("h1.product--title").text().trim();
      const itemsToFindTobaccoName = [
        tobacco.producer,
        amount + unit,
        "Tabak",
        "Tobacco",
        "-",
        ",",
        ";",
      ];
      const replacRegex = new RegExp(itemsToFindTobaccoName.join("|"), "gi");
      tobacco.name = title.replaceAll(replacRegex, "").trim();

      return tobacco;
    } catch (error: unknown) {
      console.error(`Failed to load Details from ${tobacco.source}`, error);
      throw new ScraperError(
        SITE.SHISHAWORLD,
        `Unable to scrape details for Tobacco ${tobacco.source}`
      );
    }
  }

  async scrapeSite({ withLogging }: ScrapeOptions): Promise<Tobaccos> {
    try {
      if (withLogging) console.time("page-infos");
      const { tobaccoCount, producers } = await this.retrieveShopInfos();
      if (withLogging) {
        console.log(`Found ${tobaccoCount} tobaccos listed on the website!`);
        console.timeEnd("page-infos");
        console.time("tobacco-base-infos");
      }
      const tobaccos: Tobaccos = [];
      await Promise.all(
        producers.map(async (producer) => {
          const tobaccosFromProducer = await this.#loadTobaccosFromProducer(
            producer
          );
          tobaccos.push(...tobaccosFromProducer);
        })
      );

      if (withLogging) {
        console.timeEnd("tobacco-base-infos");
        console.time("tobacco-detail-infos");
      }

      await Promise.all(
        tobaccos.map(async (tobacco) => await this.#loadTobaccoDetails(tobacco))
      );

      if (withLogging) {
        console.timeEnd("tobacco-detail-infos");
        console.log(
          `Scraped ${tobaccos.length} from ${tobaccoCount} Tobaccos on the Website!`
        );
        console.log(
          `${
            tobaccos.filter((tobacco) => !tobacco.error).length
          } without error!`
        );
      }

      return tobaccos;
    } catch (error: unknown) {
      console.error("Failed scraping", error);
      if (error instanceof ScraperError) {
        throw error;
      } else {
        throw new ScraperError(
          SITE.SHISHAWORLD,
          `Scraping failed: ${(error as Error).cause}`
        );
      }
    }
  }
  async retrieveShopInfos(): Promise<PageInfo> {
    try {
      const response = await axios(ShishaWorldRequestOptions);
      if (response.status !== 200) throw new Error(response.statusText);

      const $ = cheerio.load(response.data);
      const maxCountElement = $(".number-articles");
      const maxCountString = maxCountElement.text().trim();
      const maxCount = Number(
        maxCountString.substring(
          maxCountString.indexOf("(") + 1,
          maxCountString.lastIndexOf(" ")
        )
      );

      const producerItems = $('div.filter-panel:contains("Hersteller")').find(
        "label.filter-panel--label"
      );
      const producers = producerItems.toArray().map((node) => {
        const name = $(node).text().trim();
        const path = `/${name.replaceAll(" ", "-")}/`;
        return {
          name,
          path,
        };
      });

      return <PageInfo>{ tobaccoCount: maxCount, producers };
    } catch (error: unknown) {
      console.error(`Failed to retrieve page infos!`, error);
      throw new ScraperError(SITE.SHISHAWORLD, "Unable to retrieve PageInfos!");
    }
  }
}
