import { Page, expect } from '@playwright/test';
import { Product } from '../data/products/productsData';

export class ProductDetailsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        productName: () => this.page.getByTestId('inventory-item-name'),
        productDescription: () => this.page.getByTestId('inventory-item-desc'),
        productPrice: () => this.page.getByTestId('inventory-item-price'),
        addToCartButton: () => this.page.getByTestId('add-to-cart'),
        removeFromCartButton: () => this.page.getByTestId('remove'),
    };

    // Methods
    async verifyProductDetailsAreCorrect(product: Product) {
        await expect.soft(this.selectors.productName()).toHaveText(product.name);
        await expect.soft(this.selectors.productDescription()).toHaveText(product.description);
        await expect.soft(this.selectors.productPrice()).toHaveText(product.price);
    }

    async addProductToCart() {  
        await this.selectors.addToCartButton().click();
        await expect.soft(this.selectors.removeFromCartButton()).toBeVisible();
    }

    async removeProductFromCart() {
        await this.selectors.removeFromCartButton().click();
        await expect.soft(this.selectors.addToCartButton()).toBeVisible();
    }

    async clickBackToProductsButton() {
        await this.page.getByTestId('back-to-products').click();
    }
}