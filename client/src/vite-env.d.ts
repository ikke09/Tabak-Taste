/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_REPO_LINK: string;
  readonly VITE_APP_AUTHOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
