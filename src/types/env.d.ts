declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_EXCHANGE_RATE_API_KEY: string;
    readonly REACT_APP_API_BASE_URL?: string;
  }
}