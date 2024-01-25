import * as cheerio from "cheerio";
import axios from "axios";
import { ShishaShopScraper } from "./shisha-shop-scraper";
import { ShishaDeluxeRequestOptions } from "../constants/shisha-deluxe.constants";
import {
  Tobaccos,
  Tobacco,
  SITE,
  PageInfo,
  Producer,
  ScraperError,
  ScrapeOptions,
} from "../types";

export class ShishaDeluxeScraper implements ShishaShopScraper {
  async #loadTobaccosFromProducer(producer: Producer): Promise<Tobacco[]> {
    let tobaccosOfProducer: Tobacco[] = [];

    const producerPageRequestOptions = {
      ...ShishaDeluxeRequestOptions,
      url: `${producer.path}`,
    };
    const response = await axios(producerPageRequestOptions);
    const $ = cheerio.load(response.data);
    const links = $("a.image-wrapper").toArray();
    return (tobaccosOfProducer = links.map((link) => {
      const source = $(link).attr("href");
      return <Tobacco>{
        producer: producer.name,
        source,
        name: undefined,
        tastes: [],
        type: "Shisha-Tabak",
        amount: 200,
        unit: "g",
        price: 17.9,
        currency: "€",
        ean: undefined,
        description: undefined,
        error: undefined,
      };
    }));
  }

  async #loadTobaccoDetails(tobaccoSource: string): Promise<Tobacco> {
    const detailRequestOptions = {
      ...ShishaDeluxeRequestOptions,
      url: `/${tobaccoSource}`,
    };
    const response = await axios(detailRequestOptions);
    const $ = cheerio.load(response.data);
    const productAttributesDiv = $("div.product-attributes");
    const { 0: amount, 1: unit } = productAttributesDiv
      .find('td:contains("Inhalt")')
      .next()
      .text()
      .split(" ");
    const tobacco: Tobacco = <Tobacco>{};
    tobacco.amount = Number(amount);
    tobacco.unit = unit;

    tobacco.tastes = productAttributesDiv
      .find('td:contains("Geschmack:")')
      .next()
      .find("a")
      .toArray()
      .map((node) => $(node).attr("href").trim());

    const descriptionElement = $("div.desc");
    tobacco.description = descriptionElement.find("p").text();
    const name = descriptionElement.find('li:contains("Sorte:")').text().trim();
    tobacco.name = name.substring(name.indexOf(":") + 1).trim();

    if (tobacco.tastes.length == 0) {
      const tastes = descriptionElement
        .find('li:contains("Geschmack:")')
        .text()
        .trim();
      tobacco.tastes = tastes
        .substring(tastes.indexOf(":") + 1)
        .trim()
        .split(" ");
    }

    tobacco.price = Number($("meta[itemprop=price]").attr("content"));
    tobacco.source = `${detailRequestOptions.baseURL}${detailRequestOptions.url}`;
    return tobacco;
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
      const tobaccos: Tobacco[] = [];
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
        tobaccos.map(
          async (tobacco) => await this.#loadTobaccoDetails(tobacco.source)
        )
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
      console.error(error);
      throw new ScraperError(SITE.SHISHADELUXE, "Unable to load tobaccos!");
    }
  }

  async retrieveShopInfos(): Promise<PageInfo> {
    let info: PageInfo = {
      tobaccoCount: 0,
      producers: [],
    };
    try {
      const response = await axios(ShishaDeluxeRequestOptions);

      const $ = cheerio.load(response.data);
      const numRegEx = new RegExp("\\d+", "g");
      const maxCountInfoStr = $(".page-total").text().trim();
      const { 2: maxCount } = [...maxCountInfoStr.matchAll(numRegEx)];

      const producerItems = $("div.filter-type-manufacturer").find("li");
      const producers: Producer[] = producerItems.toArray().map((node) => {
        const name = $(node).find("span.value").text().trim();
        const href = $(node).find("a").attr("href");
        const path = href.substring(href.lastIndexOf("/"));
        return {
          name,
          path,
        };
      });

      info.tobaccoCount = +maxCount[0];
      info.producers = producers;
    } catch (error: unknown) {
      console.error(error);
      throw new ScraperError(
        SITE.SHISHADELUXE,
        "Unable to retrieve page infos!"
      );
    }
    return info;
  }
}
