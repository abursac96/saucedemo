import { Page, expect } from '@playwright/test';
import BasePage from './base/basePage';

export class LoginPage extends BasePage {
    constructor(page: Page){
        super(page)
    }

    async inputLoginInformation(username: string, password: string){
        await this.page.getByTestId('username').fill(username);
        await this.page.getByTestId('password').fill(password);
    }

    async submitLogin(){
        await this.page.getByTestId('login-button').click();
    }

    async verifyLoginErrorMessage(errorMessage: string){
        expect.soft(
            await this.page.getByTestId('error').textContent()
        ).toBe(errorMessage);
    }


}