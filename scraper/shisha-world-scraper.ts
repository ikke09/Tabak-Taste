const cheerio = require("cheerio");
const axios = require("axios");
const Tobacco = require("./types/tobacco");
const PageInfo = require("./types/page-info");
const https = require("https");

const baseURL = "https://www.shisha-world.com";
const tobaccoOverviewPageRequestOptions = {
  url: "/shisha-tabak",
  method: "get",
  baseURL,
  params: {
    n: 160,
    p: 1,
  },
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "document",
  responseEncoding: "utf8",
  httpsAgent: new https.Agent({ keepAlive: true }),
};

const loadPageInfos = async () => {
  try {
    const response = await axios(tobaccoOverviewPageRequestOptions);
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

    return new PageInfo(maxCount, producers);
  } catch (error) {
    console.error(`Failed to retrieve page infos!`);
    console.error(error);
  }
};

const loadTobaccosFromProducer = async (producer) => {
  try {
    const producerPageRequestOptions = {
      ...tobaccoOverviewPageRequestOptions,
      url: `${producer.path}`,
      params: {
        ...tobaccoOverviewPageRequestOptions.params,
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
      return new Tobacco(producer, source);
    });
  } catch (error) {
    console.error(`Failed on ${producer}`);
    console.error(error);
  }
};

const loadTobaccoDetails = async (tobacco) => {
  try {
    const detailRequestOptions = {
      ...tobaccoOverviewPageRequestOptions,
      url: `${tobacco.source.replace(baseURL, "")}`,
      params: {},
    };
    const response = await axios(detailRequestOptions);
    if (response.status !== 200) throw new Error(response.statusText);
    const $ = cheerio.load(response.data);

    const amountWithUnit = $('td.product--properties-label:contains("Inhalt")')
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
      tobacco.producer.name,
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
  } catch (error) {
    console.error(
      error.message || `Failed to load Details from ${tobacco.source}`
    );
    tobacco.error = {
      msg: error.message || `Failed to load Details from ${tobacco.source}`,
    };
  } finally {
    return tobacco;
  }
};

const scrapeShishaWorld = async (debug: boolean) => {
  if (debug) console.time("page-infos");
  const { tobaccoCount, producers } = await loadPageInfos();
  if (debug) {
    console.log(`Found ${tobaccoCount} tobaccos listed on the website!`);
    console.timeEnd("page-infos");
    console.time("tobacco-base-infos");
  }
  const tobaccos = [];
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

export default scrapeShishaWorld;
