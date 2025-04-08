import { Page, expect } from '@playwright/test';
import { Product } from '../data/products/productsData';
import { Payment } from '../data/payment/paymentData';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        checkoutPageTitle: () => this.page.getByTestId('title'),
        paymentInformationValue: () => this.page.getByTestId('payment-info-value'),
        shippingInformationValue: () => this.page.getByTestId('shipping-info-value'),
        itemTotal: () => this.page.getByTestId('subtotal-label'),
        inventoryItemName: (name: string) => this.page.getByTestId('inventory-item-name').filter({ hasText: name }),
        inventoryItemDescription: (description: string) => this.page.getByTestId('inventory-item-desc').filter({ hasText: description }),
        inventoryItemPrice: (price: string) => this.page.getByTestId('inventory-item-price').filter({ hasText: price }),
    };
    // Methods
    async verifyUserIsOnCheckoutPage() {
        await expect.soft(this.selectors.checkoutPageTitle()).toBeVisible();
        await expect.soft(this.selectors.checkoutPageTitle()).toHaveText('Checkout: Your Information');
    }

    async verifyUserIsOnCheckoutOverviewPage() {
        await expect.soft(this.selectors.checkoutPageTitle()).toBeVisible();
        await expect.soft(this.selectors.checkoutPageTitle()).toHaveText('Checkout: Overview');
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByTestId('firstName').fill(firstName);
        await this.page.getByTestId('lastName').fill(lastName);
        await this.page.getByTestId('postalCode').fill(postalCode);
    }

    async clickContinueCheckoutButton() {
        await this.page.getByTestId('continue').click();
    }

    async clickCancelButton() {
        await this.page.getByTestId('cancel').click();
    }

    async finishCheckout() {
        await this.page.getByTestId('finish').click();
    }

    async verifyProductDetails(product: Product) {
        await expect.soft(this.selectors.inventoryItemName(product.name)).toBeVisible();
        await expect.soft(this.selectors.inventoryItemDescription(product.description)).toBeVisible();
        await expect.soft(this.selectors.inventoryItemPrice(product.price)).toBeVisible();
    }

    async verifyPaymentInformation(payment: Payment) {
        await expect.soft(this.selectors.paymentInformationValue()).toBeVisible();
        await expect.soft(this.selectors.paymentInformationValue()).toHaveText(payment.card);

        await expect.soft(this.selectors.shippingInformationValue()).toBeVisible();
        await expect.soft(this.selectors.shippingInformationValue()).toHaveText(payment.shipping);
    }

    async verifyPriceDetails() {
        const textContent = await this.selectors.itemTotal().textContent();
        const [, totalInDollars] = textContent ? textContent.split(':') : ['', ''];

        // Ensure subtotalValue is trimmed and parsed as a number
        const subtotal = parseFloat(totalInDollars.trim().replace('$', ''));

        // Calculate the tax as 8% of the subtotal
        const tax = (subtotal * 0.08).toFixed(2);

        console.log(`Item Total Price: $${subtotal}, Tax Value: $${tax}`);
    }
}