import { expect, Page } from '@playwright/test';
import BasePage from './base/basePage';

export class Overlay extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private selectors = {
        cartIconCounter: () => this.page.getByTestId('shopping-cart-link').getByTestId('shopping-cart-badge'),
        burgerMenu: () => this.page.locator('.bm-item-list'),
        allItemsOption: () => this.page.getByText('All Items'),
        aboutOption: () => this.page.getByText('About'),
        logoutOption: () => this.page.getByText('Logout'),
        resetAppStateOption: () => this.page.getByText('Reset App State'),
        burgerMenuCloseButton: () => this.page.locator('#react-burger-cross-btn'),
    };

    async verifyCartIconCounter(counter: number) {
        if (counter === 0) {
            expect.soft(await this.selectors.cartIconCounter().isVisible()).toBeFalsy();
        } else {
            expect.soft(await this.selectors.cartIconCounter().textContent()).toBe(counter.toString());
        }
    }

    async clickOnCartIcon() {
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async openBurgerMenu() {
        await this.page.locator('#react-burger-menu-btn').click();
    }

    async verifyBurgerMenuActions() {
        await this.selectors.burgerMenu().waitFor({ state: 'visible' });
        await expect.soft(this.selectors.allItemsOption()).toBeVisible();
        await expect.soft(this.selectors.aboutOption()).toBeVisible();
        await expect.soft(this.selectors.logoutOption()).toBeVisible();
        await expect.soft(this.selectors.resetAppStateOption()).toBeVisible();
    }

    async closeBurgerMenu() {
        await this.selectors.burgerMenuCloseButton().click();
    }

    async verifyBurgerMenuIsClosed() {
        await this.selectors.burgerMenu().waitFor({ state: 'hidden' });
        expect.soft(await this.selectors.burgerMenuCloseButton().isVisible()).toBeFalsy();
    }

    async clickOnAllItems() {
        await this.selectors.allItemsOption().click();
    }

    async clickOnAbout() {
        await this.selectors.aboutOption().click();
    }

    async clickOnLogout() {
        await this.selectors.logoutOption().click();
    }

    async clickOnResetAppStateOption() {
        await this.selectors.resetAppStateOption().click();
    }
}