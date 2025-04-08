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

test.describe('Standard user is able to finish a purchase', () => {
    test('Verify user can checkout and finish a purchase', async ({ pages, productsData, paymentData, userData }) => {
        const product = productsData.data[randomInt(0, productsData.data.length)];
        //there's a hardcoded value in the application for payment/shippinh 
        //but it's a good example of how to prepare data for when there's 
        //more than one payment method
        const payment = paymentData[randomInt(0, paymentData.length)];
        const user = userData[randomInt(0, userData.length)];
        await pages.productsPage.addProductToCart(product.name);
        await pages.overlay.clickOnCartIcon();

        await pages.cartPage.verifyUserIsOnCartPage();
        await pages.cartPage.verifyProductDetails(product);
        await pages.cartPage.clickCheckoutButton();

        await pages.checkoutPage.fillCheckoutForm(user.firstName, user.lastName, user.postalCode);
        await pages.checkoutPage.clickContinueCheckoutButton();
        
        await pages.checkoutPage.verifyUserIsOnCheckoutOverviewPage();

        await pages.checkoutPage.verifyProductDetails(product);
        await pages.checkoutPage.verifyPaymentInformation(payment);

        await pages.checkoutPage.finishCheckout();
    });
});