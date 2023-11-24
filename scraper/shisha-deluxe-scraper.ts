import * as cheerio from "cheerio";
import axios, { AxiosRequestConfig } from "axios";
import type Tobacco from "./types/tobacco";
import type PageInfo from "./types/pageInfo";
import type Producer from "./types/producer";

const scrapeShishaDeluxe = async (info: S): Promise<Tobacco[]> => {
  if (debug) console.time("page-infos");
  const { tobaccoCount, producers } = await loadPageInfos();
  if (debug) {
    console.log(`Found ${tobaccoCount} tobaccos listed on the website!`);
    console.timeEnd("page-infos");
    console.time("tobacco-base-infos");
  }
  const tobaccos: Tobacco[] = [];
  await Promise.all(
    producers.map(async (producer) => {
      const tobaccosFromProducer = await loadTobaccosFromProducer(producer);
      tobaccos.push(...tobaccosFromProducer);
    })
  );

  if (debug) {
    console.timeEnd("tobacco-base-infos");
    console.time("tobacco-detail-infos");
  }

  await Promise.all(
    tobaccos.map(async (tobacco) => await loadTobaccoDetails(tobacco))
  );

  if (debug) {
    console.timeEnd("tobacco-detail-infos");
    console.log(
      `Scraped ${tobaccos.length} from ${tobaccoCount} Tobaccos on the Website!`
    );
    console.log(
      `${tobaccos.filter((tobacco) => !tobacco.error).length} without error!`
    );
  }

  return tobaccos;
};


const tobaccoOverviewPageRequestOptions: AxiosRequestConfig = {
  url: "/Shisha-Tabak",
  method: "get",
  baseURL: "https://www.shisha-deluxe.de",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "document",
  responseEncoding: "utf8",
};

const loadPageInfos = async (): Promise<PageInfo> => {
  let info: PageInfo = {
    tobaccoCount: 0,
    producers: [],
  };
  try {
    const response = await axios(tobaccoOverviewPageRequestOptions);

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
  } catch (error) {
    console.error(error);
  }
  return info;
};

const loadTobaccosFromProducer = async (producer: Producer): Promise<Tobacco[]> => {
  let tobaccosOfProducer: Tobacco[] = [];
  try {
    const producerPageRequestOptions = {
      ...tobaccoOverviewPageRequestOptions,
      url: `${producer.path}`,
    };
    const response = await axios(producerPageRequestOptions);
    const $ = cheerio.load(response.data);
    const links = $("a.image-wrapper").toArray();
    tobaccosOfProducer = links.map((link) => {
      const source = $(link).attr("href");
      return {
        producer,
        source,
        this.producer = producer;
        this.name = undefined;
        this.tastes = [];
        this.type = 'Shisha-Tabak';
        this.amount = 200;
        this.unit = "g";
        this.price = 17.9;
        this.currency = "€";
        this.source = source;
        this.ean = undefined;
        this.description = undefined;
        this.error = undefined;
      } as Tobacco;

    });
  } catch (error) {
    console.error(`Failed on ${producer}`);
    console.error(error);
  }
  return tobaccos;♫^^  
};

const loadTobaccoDetails = async (tobacco) => {
  try {
    const detailRequestOptions = {
      ...tobaccoOverviewPageRequestOptions,
      url: `/${tobacco.source}`,
    };
    const response = await axios(detailRequestOptions);
    const $ = cheerio.load(response.data);
    const productAttributesDiv = $("div.product-attributes");
    const { 0: amount, 1: unit } = productAttributesDiv
      .find('td:contains("Inhalt")')
      .next()
      .text()
      .split(" ");

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
  } catch (error) {
    tobacco.error = {
      msg: error.message || "Failed to load Details",
    };
  }
};



export default scrapeShishaDeluxe;
