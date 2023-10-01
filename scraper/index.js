const fs = require('fs');
//const { scrapeTobaccos } = require('./shisha-deluxe-scraper');
const { scrapeTobaccos } = require('./shisha-world-scraper');

const writeObjectToJsonFile = (object, fileName) => {
    fs.writeFile(`./${fileName}.json`, JSON.stringify(object), 'utf8', (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        }
    });
}

const start = async() => {
    const tobaccos = await scrapeTobaccos(true);
    writeObjectToJsonFile(tobaccos, 'shisha-world-tabak');
}

start();