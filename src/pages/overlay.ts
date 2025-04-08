import { expect, Page } from '@playwright/test';
import BasePage from './base/basePage';

export class Overlay extends BasePage {
    constructor(page: Page){
        super(page)
    }

    private cartIcon() { 
        return this.page.getByTestId('shopping-cart-link'); 
    }

    private cartIconCounter() {
        return this.cartIcon().getByTestId('shopping-cart-badge')
    }
    
    async verifyCartIconCounter(counter: number) {
        if(counter === 0) {
            expect.soft(await this.cartIconCounter().isVisible()).toBeFalsy();
        } else {
            expect.soft(await this.cartIconCounter().textContent()).toBe(counter.toString());
        }
    }

    async clickOnCartIcon(){
        await this.cartIcon().click();
    }
}