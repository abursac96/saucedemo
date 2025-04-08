import { Page } from "@playwright/test";

/**
 * Base page used as base class in case page should 
 * ever have any common methods  
 */
class BasePage {
    readonly _page: Page;

    constructor(page: Page){
        this._page = page;
    }

    get page() {
        return this._page;
    }
}

export default BasePage