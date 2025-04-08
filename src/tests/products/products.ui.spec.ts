import { test } from '../../fixture/baseFixture';

test.beforeEach(async ({ pages, authData}) => {
    await pages.navigation.navigateToApplication();
    await pages.loginPage.inputLoginInformation(
        authData.getUser('standard_user').username, 
        authData.getUser('standard_user').password
    );
    await pages.loginPage.submitLogin();
});

test.describe('Standard user is able to interact with product page', () => {
    /*
        The test is built in a way where expanding the products data also expands the test case.
        No need to add new test case if we ever want to verify any additional new products
    */
    test('Verify product data is displayed correctly @TC-12', async ({ pages, productsData }) => {
        for (const product of productsData.data) {
            await pages.productsPage.verifyProductDetails(product);
        }
    });

    test('Verify sorting A to Z places the correct product at the top @TC-13', async ({ pages, productsData }) => {
        await pages.productsPage.sortProducts('az');
        await pages.productsPage.compareSortedProducts(productsData.sortProductsAZ());
    });

    test('Verify sorting Z to A places the correct product at the top @TC-14', async ({ pages, productsData }) => {
        await pages.productsPage.sortProducts('za');
        await pages.productsPage.compareSortedProducts(productsData.sortProductsZA());
    });

    test('Verify sorting Low to High places the correct product at the top @TC-15', async ({ pages, productsData }) => {
        await pages.productsPage.sortProducts('lohi');
        await pages.productsPage.compareSortedProducts(productsData.sortProductsByPriceLowToHigh());
    });

    test('Verify sorting High to Low places the correct product at the top @TC-16', async ({ pages, productsData }) => {
        await pages.productsPage.sortProducts('hilo');
        await pages.productsPage.compareSortedProducts(productsData.sortProductsByPriceHighToLow());
    });

    //Might not be the most realistic testcase but I thought it would be good to showcase how
    //something like this can be resolved
    test('Verify that image urls and alt text are correct @TC-17', async ({ pages, productsData }) => {
        for (const product of productsData.data) {
            await pages.productsPage.verifyImageUrlAndAltText(product);
        }
    });
});