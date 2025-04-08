import { test } from '../../fixture/baseFixture';
import { randomInt } from 'crypto';


test.beforeEach(async ({ pages, authData}) => {
    await pages.navigation.navigateToApplication();
    await pages.loginPage.inputLoginInformation(
        authData.getUser('standard_user').username, 
        authData.getUser('standard_user').password
    );
    await pages.loginPage.submitLogin();
});

test.describe('Standard user is able to interact with cart', () => {
    test('Verify removing products from cart affect cart-icon status @TC-18', async ({ pages, productsData }) => {
        let addedProductsCounter = 0;
        for (const product of productsData.data) {
            await pages.productsPage.addProductToCart(product.name);
            addedProductsCounter++;
            await pages.overlay.verifyCartIconCounter(addedProductsCounter);
        }
        for (const product of productsData.data) {
            await pages.productsPage.removeProductFromCart(product.name);
            addedProductsCounter--;
            await pages.overlay.verifyCartIconCounter(addedProductsCounter);
        }
    });

    test('Verify that cart page displays correct product data @TC-19', async ({ pages, productsData }) => {
        const product = productsData.data[randomInt(0, productsData.data.length)];
        await pages.productsPage.addProductToCart(product.name);
        await pages.overlay.clickOnCartIcon();
        await pages.cartPage.verifyUserIsOnCartPage();
        await pages.cartPage.verifyProductDetails(product);
    });

    test('Verify that remove button on Your Cart removes product from cart @TC-20', async ({ pages, productsData }) => {
        const product = productsData.data[randomInt(0, productsData.data.length)];
        await pages.overlay.verifyCartIconCounter(0);
        await pages.productsPage.addProductToCart(product.name);
        await pages.overlay.verifyCartIconCounter(1);
        await pages.overlay.clickOnCartIcon();
        await pages.cartPage.verifyUserIsOnCartPage();
        await pages.cartPage.verifyProductDetails(product);
        await pages.cartPage.removeProductFromCart(product.name);
        await pages.overlay.verifyCartIconCounter(0);
    });

    test('Verify that navigation using buttons in shopping process leads to proper pages @TC-21', async ({ pages, userData }) => {
        const user = userData[randomInt(0, userData.length)];
        await pages.overlay.clickOnCartIcon();
        
        await pages.cartPage.verifyUserIsOnCartPage();
        await pages.cartPage.clickContinueShoppingButton();

        await pages.productsPage.verifyUserIsOnProductsPage();
        await pages.overlay.clickOnCartIcon();

        await pages.cartPage.clickCheckoutButton();
        await pages.checkoutPage.verifyUserIsOnCheckoutPage();

        await pages.checkoutPage.fillCheckoutForm(user.firstName, user.lastName, user.postalCode);
        await pages.checkoutPage.clickContinueCheckoutButton();

        await pages.checkoutPage.verifyUserIsOnCheckoutOverviewPage();
        await pages.checkoutPage.clickCancelButton();

        await pages.productsPage.verifyUserIsOnProductsPage();
    });
});