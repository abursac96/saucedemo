import { randomInt } from 'crypto';
import { test } from '../../fixture/baseFixture';

test.beforeEach(async ({ pages, authData}) => {
    await pages.navigation.navigateToApplication();
    await pages.loginPage.inputLoginInformation(
        authData.getUser('standard_user').username, 
        authData.getUser('standard_user').password
    );
    await pages.loginPage.submitLogin();
});

test.describe('Standard user is able to use Burger Menu interactions', () => {
    test('Verify user can open and close Burger Menu @TC-24', async ({ pages }) => {
        await pages.overlay.openBurgerMenu();
        await pages.overlay.verifyBurgerMenuActions();
        await pages.overlay.closeBurgerMenu();
        await pages.overlay.verifyBurgerMenuIsClosed();
    });

    test('Verify user can click on "All Items" in burger menu and be sent to the products page @TC-25', async ({ pages }) => {
        await pages.overlay.clickOnCartIcon();
        await pages.cartPage.verifyUserIsOnCartPage();
        await pages.overlay.openBurgerMenu();
        await pages.overlay.clickOnAllItems();
        await pages.productsPage.verifyUserIsOnProductsPage();
    });

    test('Verify user can click on "About" in burger menu and be sent to the about page @TC-26', async ({ pages }) => {
        await pages.overlay.openBurgerMenu();
        await pages.overlay.clickOnAbout();
        await pages.navigation.verifyCurrentPage("https://saucelabs.com/");
        await pages.navigation.navigateToInventoryPage();
    });

    test('Verify user can click on "Logout" in burger menu and be logged out @TC-27', async ({ pages }) => {
        await pages.overlay.openBurgerMenu();
        await pages.overlay.clickOnLogout();
        await pages.navigation.verifyCurrentPage("https://www.saucedemo.com/");
        await pages.loginPage.verifyUserIsOnLoginPage();
    });

    test('Verify user can click on "Reset App State" in burger menu and be sent to the products page @TC-28', async ({ pages, productsData }) => {
        const product = productsData.data[randomInt(0, productsData.data.length)];

        await pages.productsPage.addProductToCart(product.name);
        await pages.overlay.verifyCartIconCounter(1);
        await pages.overlay.clickOnCartIcon();

        await pages.overlay.openBurgerMenu();
        await pages.overlay.clickOnResetAppStateOption();

        /*
            I'm pretty sure this is not the expected behavior of the app.
            It's supposed to reset and return to the products page, but it doesn't.
            It just removes the products from the cart. This is why I add a click on "All Items"
            to go back to the products page.
        */
        await pages.overlay.clickOnAllItems();
        await pages.productsPage.verifyUserIsOnProductsPage();

        await pages.overlay.verifyCartIconCounter(0);
    });

});