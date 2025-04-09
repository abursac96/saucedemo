import { Page, expect } from '@playwright/test';
import { Product } from '../data/products/productsData';

export class ProductsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        productsPageTitle: () => this.page.getByTestId('title'),
        productByName: (productName: string) => this.page.getByTestId('inventory-item-name').filter({ hasText: productName }),
        inventoryItem: () => this.page.getByTestId('inventory-item'),
        inventoryItems: () => this.page.getByTestId('inventory-item').all(),
        productDescription: (productName: string) => this.page.getByTestId('inventory-item').filter({ hasText: productName }).locator('.inventory_item_desc'),
        productPrice: (productName: string) => this.page.getByTestId('inventory-item').filter({ hasText: productName }).locator('.inventory_item_price'),
        addToCartButton: (productName: string) => this.page.getByTestId('inventory-item').filter({ hasText: productName }).getByText('Add to cart'),
        removeFromCartButton: (productName: string) => this.page.getByTestId('inventory-item').filter({ hasText: productName }).getByText('Remove'),
        imageLocator: (productName: string) => this.page.getByTestId('inventory-item').filter({ hasText: productName }).locator('img'),
        productSortContainer: () => this.page.getByTestId('product-sort-container'),
    };

    // Methods
    async addProductToCart(productName: string) {
        await this.selectors.addToCartButton(productName).click();
        expect.soft(await this.selectors.addToCartButton(productName).isVisible()).toBeFalsy();
        expect.soft(await this.selectors.removeFromCartButton(productName).isVisible()).toBeTruthy();
    }

    async removeProductFromCart(productName: string) {
        await this.selectors.removeFromCartButton(productName).click();
        expect.soft(await this.selectors.removeFromCartButton(productName).isVisible()).toBeFalsy();
        expect.soft(await this.selectors.addToCartButton(productName).isVisible()).toBeTruthy();
    }

    async verifyProductIsDisplayed(productName: string) {
        await this.selectors.productByName(productName).waitFor();
    }

    async verifyUserIsOnProductsPage() {
        expect.soft(await this.selectors.productsPageTitle().isVisible()).toBeTruthy();
        expect.soft(await this.selectors.productsPageTitle().textContent()).toBe('Products');
    }

    async verifyProductDetails(product: Product) {
        expect.soft(await this.selectors.productByName(product.name).textContent()).toBe(product.name);
        expect.soft(await this.selectors.productDescription(product.name).textContent()).toBe(product.description);
        expect.soft(await this.selectors.productPrice(product.name).textContent()).toBe(product.price);
    }

    async sortProducts(sortingValue: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.selectors.productSortContainer().selectOption(sortingValue);
    }

    async compareSortedProducts(productsArray: Product[]) {
        const sortedProducts = await this.selectors.inventoryItems();
        for (let i = 0; i < sortedProducts.length; i++) {
            const productName = await sortedProducts[i].getByTestId('inventory-item-name').textContent();
            expect.soft(productName).toBe(productsArray[i].name);
        }
    }

    async verifyImageUrlAndAltText(product: Product) {
        const imageUrl = await this.selectors.imageLocator(product.name).getAttribute('src');
        const imageAltText = await this.selectors.imageLocator(product.name).getAttribute('alt');
        expect.soft(imageUrl).toBe(product.src);
        expect.soft(imageAltText).toBe(product.alt);
    }

    async clickOnProduct(productName: string) {
        await this.selectors.productByName(productName).click();
    }
}