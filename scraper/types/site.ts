enum SITE {
  SHISHAWORLD = "Shisha-World",
  SHISHADELUXE = "Shisha-Deluxe",
}

type SiteEnum = keyof typeof SITE;

type RequestOptions = {
  method: "get" | "post";
  headers: {
    [key: string]: string;
  };
  responseType: "document" | "application/json";
  responseEncoding: string;
};

export const DefaultRequestOptions: RequestOptions = {
  method: "get",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "document",
  responseEncoding: "utf8",
};

type SiteInformation = {
  name: string;
  baseURL: string;
  defaultRequestOptions: RequestOptions;
  debug: boolean;
};

type SiteMap = Record<SITE, SiteInformation>;

export { SITE, SiteEnum, SiteInformation, SiteMap };
