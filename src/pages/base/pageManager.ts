import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { Navigation } from '../../pages/navigation';
import { ProductsPage } from '../productsPage';
import { CartPage } from '../cartPage';
import { CheckoutPage } from '../checkoutPage';
import { Overlay } from '../overlay';

export class PageManager {
    private _loginPage: LoginPage;
    private _navigation: Navigation;
    private _overlay: Overlay;
    private _productsPage: ProductsPage;
    private _cartPage: CartPage;
    private _checkoutPage: CheckoutPage;

    constructor(page: Page){
        this._loginPage = new LoginPage(page);
        this._navigation = new Navigation(page);
        this._productsPage = new ProductsPage(page);
        this._cartPage = new CartPage(page);
        this._checkoutPage = new CheckoutPage(page);
        this._overlay = new Overlay(page);
    }

    //getters
    get loginPage(){
        return this._loginPage;
    }

    get navigation(){
        return this._navigation;
    }

    get productsPage(){
        return this._productsPage;
    }

    get cartPage(){
        return this._cartPage;
    }

    get checkoutPage(){
        return this._checkoutPage;
    }

    get overlay(){
        return this._overlay;
    }
}