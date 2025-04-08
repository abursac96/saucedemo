import { loadConfig } from "./env.config";

//BASE URL
const environment = loadConfig();
export const BASE_PAGE_URL = environment;

//OTHER PAGE URLS