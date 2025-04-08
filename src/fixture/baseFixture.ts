import { test as base } from '@playwright/test';
import { PageManager } from '../pages/base/pageManager';
import { userCredentials } from '../data/authentication/authenticationData';
import { userData } from '../data/userCheckout/userData';
import { paymentData } from '../data/payment/paymentData';
import { productsData, sortProductsAZ, sortProductsZA, sortProductsByPriceLowToHigh, sortProductsByPriceHighToLow } from '../data/products/productsData';

export {
    expect,
    request,
    type Page,
    type Locator,
    type BrowserContext,
    type PlaywrightTestArgs,
    type PlaywrightWorkerArgs,
    type TestType,
} from '@playwright/test';

/**
 * Using this fixture avoids unnecessary imports in each test file.
 * It also avoids unnecessary page instantiations, making sure they're all available in every test
 * by just using pages.<pageName>
 */
export const test = base.extend<{
    pages: PageManager;
    authData: { getUser: (userType: string) => { username: string; password: string } };
    userData: typeof userData;
    paymentData: typeof paymentData;
    productsData: {
        data: typeof productsData;
        sortProductsAZ: typeof sortProductsAZ;
        sortProductsZA: typeof sortProductsZA;
        sortProductsByPriceLowToHigh: typeof sortProductsByPriceLowToHigh;
        sortProductsByPriceHighToLow: typeof sortProductsByPriceHighToLow;
    };
}>({
    // Expose PageManager tests like mentioned above
    pages: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
    // Expose authData so that we can select users from authentication data by user type
    authData: async ({}, use) => {
        const getUser = (userType: string) => {
            const user = userCredentials.find((u) => u.userType === userType);
            if (!user) {
                throw new Error(`User type "${userType}" not found in authentication data.`);
            }
            return { username: user.username, password: user.password };
        };
        await use({ getUser });
    },
    userData: async ({}, use) => {
        await use(userData);
    },
    paymentData: async ({}, use) => {
        await use(paymentData);
    },
    productsData: async ({}, use) => {
        await use({
            data: productsData,
            sortProductsAZ: sortProductsAZ,
            sortProductsZA: sortProductsZA,
            sortProductsByPriceLowToHigh: sortProductsByPriceLowToHigh,
            sortProductsByPriceHighToLow: sortProductsByPriceHighToLow,
        });
    },
});