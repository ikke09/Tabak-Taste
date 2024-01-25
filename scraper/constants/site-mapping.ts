import { SiteMap, SITE } from "../types/site";
import { ShishaDeluxeRequestOptions } from "./shisha-deluxe.constants";
import { ShishaWorldRequestOptions } from "./shisha-world.constants";

const SiteWithInformationMap: SiteMap = {
  [SITE.SHISHAWORLD]: {
    name: "Shisha-World",
    baseURL: "https://www.shisha-world.com/",
    defaultRequestOptions: ShishaWorldRequestOptions,
    debug: true,
  },
  [SITE.SHISHADELUXE]: {
    name: "Shisha-Deluxe",
    baseURL: "https://www.shisha-deluxe.de/",
    defaultRequestOptions: ShishaDeluxeRequestOptions,
    debug: true,
  },
};

export default SiteWithInformationMap;
