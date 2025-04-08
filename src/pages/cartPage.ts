import { Page, expect } from '@playwright/test';
import { Product } from '../data/products/productsData';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        cartPageTitle: () => this.page.getByTestId('title'),
        inventoryItemName: (name: string) => this.page.getByTestId('inventory-item-name').filter({ hasText: name }),
        inventoryItemDescription: (description: string) => this.page.getByTestId('inventory-item-desc').filter({ hasText: description }),
        inventoryItemPrice: (price: string) => this.page.getByTestId('inventory-item-price').filter({ hasText: price }),
    };

    // Methods
    async verifyUserIsOnCartPage() {
        await expect.soft(this.selectors.cartPageTitle()).toBeVisible();
        await expect.soft(this.selectors.cartPageTitle()).toHaveText('Your Cart');
    }

    async clickContinueShoppingButton() {
        await this.page.getByTestId('continue-shopping').click();
    }

    async clickCheckoutButton() {
        await this.page.getByTestId('checkout').click();
    }

    async verifyProductDetails(product: Product) {
        await expect.soft(this.selectors.inventoryItemName(product.name)).toBeVisible();
        await expect.soft(this.selectors.inventoryItemDescription(product.description)).toBeVisible();
        await expect.soft(this.selectors.inventoryItemPrice(product.price)).toBeVisible();
    }

    async removeProductFromCart(productName: string) {
        await this.page
            .getByTestId('inventory-item')
            .filter({ hasText: productName })
            .getByText('Remove')
            .click();
    }
}