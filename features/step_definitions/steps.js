const { Given, When, Then } = require('@cucumber/cucumber')
const { POManger } = require('../../pageObjects/POManager')
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');

Given('a login to Application with {string} and {string}', { timeout: 200 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogIn(username, password);
});

When('add the {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchItemAndAddToCart(productName);

});

Then('verify {string} is displayed in the cart page', { timeout: 100 * 1000 }, async function (productName) {
    await this.dashboardPage.navigateToCartPage();
    this.myCartpage = this.poManager.getMyCartPage();
    await this.myCartpage.validateAddedProduct(productName);
});

When('enter valid details and place the order using country {string}, email is {string} and message is {string}', { timeout: 100 * 1000 }, async function (country, username, msg) {
    await this.myCartpage.navigateToPayment();
    const paymentMethodPage = this.poManager.getPaymentMethodPage();
    await paymentMethodPage.validateEmailSelectCountryPlaceOrder(country, username);
    this.orderSuccessfulPage = this.poManager.getOrderSuccessfulPage();
    this.orderID = await this.orderSuccessfulPage.validateMessageAndStoreOrderID(msg);
});

Then('verify order is present in the order history page', async function () {
    await this.orderSuccessfulPage.navigateToOrderPage();
    const yourOrderPage = this.poManager.getYourOrderPage();
    await yourOrderPage.navigateToOrderDetailsPage(this.orderID);
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    await orderSummaryPage.validateOrderProduct(this.orderID);
});

Then('validate the error message', async function () {
  await expect(this.page.locator("div[role='alert']")).toBeVisible();
});