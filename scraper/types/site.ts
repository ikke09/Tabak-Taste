import { AxiosRequestConfig } from "axios";

export enum SITE {
  SHISHAWORLD = "Shisha-World",
  SHISHADELUXE = "Shisha-Deluxe",
}

export type SiteEnum = keyof typeof SITE;

export type SiteInformation = {
  name: string;
  baseURL: string;
  defaultRequestOptions: AxiosRequestConfig;
  debug: boolean;
};

export type SiteMap = Record<SITE, SiteInformation>;
