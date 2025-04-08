import { test } from '../../fixture/baseFixture';
import { userCredentials, lockedOutUserCredentials, invalidLoginData } from '../../data/authentication/authenticationData';

test.beforeEach(async ({ pages }) => {
    await pages.navigation.navigateToApplication();
});

// The base login test is useful for all but one user types, and there is no need to repeat the same test for each user type
test.describe('Different user types are able to login', () => {
    userCredentials.forEach(({ username, password, tag, userType }) => {
        test(`user type ${userType} is able to login ${tag}`, async ({ pages }) => {
            await pages.loginPage.inputLoginInformation(username, password);
            await pages.loginPage.submitLogin();
            //verification that the user is actually logged in, by checking that he is on the products page
            await pages.productsPage.verifyUserIsOnProductsPage();
        })
    });
});

// This is the only user type that is actually unable to login, so it is a separate test case
// It could be added to invalid login tests but I think it's better here as a separate logic case
test.describe('Locked out user is unable to login', () => {
    test(`user type locked_out_user is unable to login @TC-6`, async ({ pages }) => {
        await pages.loginPage.inputLoginInformation(lockedOutUserCredentials.username, lockedOutUserCredentials.password);
        await pages.loginPage.submitLogin();
        //Check that the user is still on the login page, and that there is an appropriate error message
        await pages.loginPage.verifyLoginErrorMessage("Epic sadface: Sorry, this user has been locked out.");
    });
});

test.describe('Invalid input on login is handled correctly', () => {
    invalidLoginData.forEach(({ username, password, testName, tag, errorMessage }) => {
        test(`user cannot login with ${testName} ${tag}`, async ({ pages }) => {
            await pages.loginPage.inputLoginInformation(username, password);
            await pages.loginPage.submitLogin();
            //Check that the user is still on the login page, and that there is an appropriate error message
            await pages.loginPage.verifyLoginErrorMessage(errorMessage);
        });
    });
});
