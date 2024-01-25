import { AxiosRequestConfig } from "axios";

export const ShishaDeluxeRequestOptions: AxiosRequestConfig = {
  url: "/Shisha-Tabak",
  method: "get",
  baseURL: "https://www.shisha-deluxe.de",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "document",
  responseEncoding: "utf8",
};
