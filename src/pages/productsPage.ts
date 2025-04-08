import { Page, expect } from '@playwright/test';
import { Product } from '../data/products/productsData';

export class ProductsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //moved here as the test id is referenced in both selectors and methods
    private inventoryItemNameTestid = 'inventory-item-name';

    //Selectors
    private productsPageTitle(){
        return this.page.getByTestId('title'); 
    }

    private productByName(productName: string) { 
        return this.page.getByTestId(this.inventoryItemNameTestid).filter({ hasText: productName });
    }

    private inventoryItem(){
        return this.page.getByTestId('inventory-item'); 
    }

    private inventoryItems() {
        return this.inventoryItem().all();
    }

    private productDescription(productName: string) { 
        return this.inventoryItem().filter({ hasText: productName }).locator('.inventory_item_desc');        
    }

    private productPrice(productName: string) { 
        return this.inventoryItem().filter({ hasText: productName }).locator('.inventory_item_price'); 
    }

    private addToCartButton(productName: string) { 
        return this.inventoryItem().filter({ hasText: productName }).getByText('Add to cart');    
    }

    private removeFromCartButton(productName: string) {
        return this.inventoryItem().filter({ hasText: productName }).getByText('Remove');
    }

    private imageLocator(productName: string) {
        return this.inventoryItem().filter({ hasText: productName }).locator('img');
    }

    //Methods
    async addProductToCart(productName: string) {
        await this.addToCartButton(productName).click();
        expect.soft(await this.addToCartButton(productName).isVisible()).toBeFalsy();
        expect.soft(await this.removeFromCartButton(productName).isVisible()).toBeTruthy();
    }

    async removeProductFromCart(productName: string) {
        await this.removeFromCartButton(productName).click();
        expect.soft(await this.removeFromCartButton(productName).isVisible()).toBeFalsy();
        expect.soft(await this.addToCartButton(productName).isVisible()).toBeTruthy();
    }

    async verifyProductIsDisplayed(productName: string) {
        await this.productByName(productName).waitFor();
    }

    async verifyUserIsOnProductsPage() {
        expect.soft(await this.productsPageTitle().isVisible()).toBeTruthy();
        expect.soft(await this.productsPageTitle().textContent()).toBe('Products');
    }

    async verifyProductDetails(product: Product) {
        expect.soft(await this.productByName(product.name).textContent()).toBe(product.name);
        expect.soft(await this.productDescription(product.name).textContent()).toBe(product.description);
        expect.soft(await this.productPrice(product.name).textContent()).toBe(product.price);
    }

    async sortProducts(sortingValue: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.page.getByTestId('product-sort-container').selectOption(sortingValue);
    }

    async compareSortedProducts(productsArray: Product[]) {
        const sortedProducts = await this.inventoryItems();
        for (let i = 0; i < sortedProducts.length; i++) {
            const productName = await sortedProducts[i].getByTestId(this.inventoryItemNameTestid).textContent();
            expect.soft(productName).toBe(productsArray[i].name);
        }
    }

    async verifyImageUrlAndAltText(product: Product) {
        const imageUrl = await this.imageLocator(product.name).getAttribute('src');
        const imageAltText = await this.imageLocator(product.name).getAttribute('alt');
        expect.soft(imageUrl).toBe(product.src);
        expect.soft(imageAltText).toBe(product.alt);
    }

}