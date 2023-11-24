import { SITE } from "./types/site";
import * as fs from "fs";

//const { scrapeTobaccos } = require('./shisha-deluxe-scraper');
const { scrapeTobaccos } = require("./shisha-world-scraper");

const writeObjectToJsonFile = (object, fileName) => {
  fs.writeFile(`./${fileName}.json`, JSON.stringify(object), "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    }
  });
};

const start = async () => {
  const args = process.argv.slice(2);
  const option = args[0];
  if (option == "-s" || option == "--site") {
    const value = args[1] as string;
    switch (value) {
      case SITE.SHISHAWORLD:
    }
  } else {
    console.error("No Site given");
  }
  const tobaccos = await scrapeTobaccos(true);
  writeObjectToJsonFile(tobaccos, "shisha-world-tabak");
};

start();
