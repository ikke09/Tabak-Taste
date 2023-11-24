import { SiteMap, SITE, DefaultRequestOptions } from "./types/site";

const SiteWithInformationMap: SiteMap = {
  [SITE.SHISHAWORLD]: {
    name: "Shisha-World",
    baseURL: "https://www.shisha-world.com/",
    defaultRequestOptions: DefaultRequestOptions,
    debug: true,
  },
  [SITE.SHISHADELUXE]: {
    name: "Shisha-Deluxe",
    baseURL: "https://www.shisha-deluxe.de/",
    defaultRequestOptions: DefaultRequestOptions,
    debug: true,
  },
};

export default SiteWithInformationMap;
