import { loadConfig } from "./env.config";

//BASE URL
const environment = loadConfig();
export const BASE_PAGE_URL = environment;
export const INVENTORY_URL = environment + '/inventory.html';

//OTHER PAGE URLS