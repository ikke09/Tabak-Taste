import * as cheerio from 'cheerio';
import axios from 'axios';
import { ShishaShopScraper } from './shisha-shop-scraper';
import { ShishaDeluxeRequestOptions } from '../constants/shisha-deluxe.constants';
import {
  TobaccosWithProducer,
  TobaccoWithProducer,
  SITE,
  PageInfo,
  ScraperError,
  ScrapeOptions,
  ProducerWithoutId,
} from '@tabak-taste/types';

export class ShishaDeluxeScraper implements ShishaShopScraper {
  async #loadTobaccosFromProducer(
    producer: ProducerWithoutId
  ): Promise<TobaccosWithProducer> {
    try {
      const producerPageRequestOptions = {
        ...ShishaDeluxeRequestOptions,
        url: `${producer.path}`,
      };
      const response = await axios(producerPageRequestOptions);
      const $ = cheerio.load(response.data);
      const links = $('a.image-wrapper').toArray();
      return <TobaccosWithProducer>links.map((link) => {
        const source = $(link).attr('href')!;
        return <TobaccoWithProducer>{
          producer: { name: producer.name, path: '' },
          source,
          name: '',
          tastes: [],
          type: 'Shisha-Tabak',
          amount: 200,
          unit: 'g',
          price: 17.9,
          currency: '€',
          ean: '',
          description: '',
        };
      });
    } catch (error: unknown) {
      console.error(`Failed loading from ${producer}`, error);
      throw new ScraperError(
        SITE.SHISHADELUXE,
        `Failed to load tobaccos from Producer ${producer}`
      );
    }
  }

  async #loadTobaccoDetails(
    tobaccoSource: string
  ): Promise<TobaccoWithProducer> {
    try {
      const detailRequestOptions = {
        ...ShishaDeluxeRequestOptions,
        url: `/${tobaccoSource}`,
      };
      const response = await axios(detailRequestOptions);
      const $ = cheerio.load(response.data);
      const productAttributesDiv = $('div.product-attributes');
      const { 0: amount, 1: unit } = productAttributesDiv
        .find('td:contains("Inhalt")')
        .next()
        .text()
        .split(' ');
      const tobacco: TobaccoWithProducer = <TobaccoWithProducer>{};
      tobacco.amount = Number(amount);
      tobacco.unit = unit;

      tobacco.tastes = productAttributesDiv
        .find('td:contains("Geschmack:")')
        .next()
        .find('a')
        .toArray()
        .map((node) => $(node).attr('href')!.trim());

      const descriptionElement = $('div.desc');
      tobacco.description = descriptionElement.find('p').text();
      const name = descriptionElement
        .find('li:contains("Sorte:")')
        .text()
        .trim();
      tobacco.name = name.substring(name.indexOf(':') + 1).trim();

      if (tobacco.tastes.length == 0) {
        const tastes = descriptionElement
          .find('li:contains("Geschmack:")')
          .text()
          .trim();
        tobacco.tastes = tastes
          .substring(tastes.indexOf(':') + 1)
          .trim()
          .split(' ');
      }

      tobacco.price = Number($('meta[itemprop=price]').attr('content'));
      tobacco.source = `${detailRequestOptions.baseURL}${detailRequestOptions.url}`;
      return tobacco;
    } catch (error: unknown) {
      console.error(`Failed to load Details from ${tobaccoSource}`, error);
      throw new ScraperError(
        SITE.SHISHADELUXE,
        `Unable to scrape details for Tobacco ${tobaccoSource}`
      );
    }
  }

  async scrapeSite({
    withLogging,
  }: ScrapeOptions): Promise<TobaccosWithProducer> {
    try {
      if (withLogging) console.time('page-infos');
      const { tobaccoCount, producers } = await this.retrieveShopInfos();
      if (withLogging) {
        console.log(`Found ${tobaccoCount} tobaccos listed on the website!`);
        console.timeEnd('page-infos');
        console.time('tobacco-base-infos');
      }
      const tobaccos: TobaccosWithProducer = [];
      await Promise.all(
        producers.map(async (producer) => {
          const tobaccosFromProducer = await this.#loadTobaccosFromProducer(
            producer
          );
          tobaccos.push(...tobaccosFromProducer);
        })
      );

      if (withLogging) {
        console.timeEnd('tobacco-base-infos');
        console.time('tobacco-detail-infos');
      }

      await Promise.all(
        tobaccos.map(
          async (tobacco) => await this.#loadTobaccoDetails(tobacco.source)
        )
      );

      if (withLogging) {
        console.timeEnd('tobacco-detail-infos');
        console.log(
          `Scraped ${tobaccos.length} from ${tobaccoCount} Tobaccos on the Website!`
        );
      }

      return tobaccos;
    } catch (error: unknown) {
      console.error('Failed scraping', error);
      if (error instanceof ScraperError) {
        throw error;
      } else {
        throw new ScraperError(
          SITE.SHISHADELUXE,
          `Scraping failed: ${(error as Error).message}`
        );
      }
    }
  }

  async retrieveShopInfos(): Promise<PageInfo> {
    try {
      const info: PageInfo = {
        tobaccoCount: 0,
        producers: [],
      };
      const response = await axios(ShishaDeluxeRequestOptions);

      const $ = cheerio.load(response.data);
      const numRegEx = new RegExp('\\d+', 'g');
      const maxCountInfoStr = $('.page-total').text().trim();
      const { 2: maxCount } = [...maxCountInfoStr.matchAll(numRegEx)];

      const producerItems = $('div.filter-type-manufacturer').find('li');
      const producers: ProducerWithoutId[] = producerItems
        .toArray()
        .map((node) => {
          const name = $(node).find('span.value').text().trim();
          const href = $(node).find('a').attr('href');
          const path = href ? href.substring(href.lastIndexOf('/')) : '/';
          return {
            name,
            path,
          };
        });

      info.tobaccoCount = +maxCount[0];
      info.producers = producers;
      return info;
    } catch (error: unknown) {
      console.error(`Failed to retrieve page infos!`, error);
      throw new ScraperError(
        SITE.SHISHADELUXE,
        'Unable to retrieve PageInfos!'
      );
    }
  }
}
