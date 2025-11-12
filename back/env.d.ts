declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;
    FRONTEND_URL?: string;
    RATE_LIMIT_WINDOW?: string;
    RATE_LIMIT_MAX?: string;
  }
}
