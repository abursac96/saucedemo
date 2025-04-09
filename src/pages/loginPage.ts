import { Page, expect } from '@playwright/test';
import BasePage from './base/basePage';

export class LoginPage extends BasePage {
    constructor(page: Page){
        super(page)
    }

    private selectors = {
        loginButton: () => this.page.getByTestId('login-button'),
    }


    async inputLoginInformation(username: string, password: string){
        await this.page.getByTestId('username').fill(username);
        await this.page.getByTestId('password').fill(password);
    }

    async submitLogin(){
        await this.selectors.loginButton().click();
    }

    async verifyLoginErrorMessage(errorMessage: string){
        expect.soft(
            await this.page.getByTestId('error').textContent()
        ).toBe(errorMessage);
    }

    async verifyUserIsOnLoginPage(){
        await expect.soft(this.selectors.loginButton()).toBeVisible();
        await expect.soft(this.selectors.loginButton()).toHaveText('Login');
    }


}