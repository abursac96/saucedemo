import { Page } from '@playwright/test';
import BasePage from './base/basePage';
import * as globalConstants from '../env/constants';

export class Navigation extends BasePage {
    constructor(page: Page){
        super(page)
    }

    async navigateToApplication() {
        await this.page.goto(globalConstants.BASE_PAGE_URL);
        await this.page.waitForLoadState('load');
    }
}