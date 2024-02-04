import { AxiosRequestConfig } from "axios";
import { Agent } from "https";

export const ShishaWorldRequestOptions: AxiosRequestConfig = {
  url: "/shisha-tabak",
  method: "get",
  baseURL: "https://www.shisha-world.com",
  params: {
    n: 160,
    p: 1,
  },
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "document",
  responseEncoding: "utf8",
  httpsAgent: new Agent({ keepAlive: true }),
};
