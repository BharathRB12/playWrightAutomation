const { expect } = require("@playwright/test");

class OrderSuccessfulPage
{
    constructor(page)
        {
            this.page = page;
            this.orderSuccessMessage = page.locator(".hero-primary");
            this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
            this.orderHistoryLink = page.locator(".em-spacer-1 [routerlink*='myorders']");

        }

    async validateMessageAndStoreOrderID(message)
    {
        await expect(this.orderSuccessMessage).toHaveText(message);
        const productOrderID=await this.orderID.textContent();
        console.log(productOrderID);
        return productOrderID;
    }

    async navigateToOrderPage()
    {
        await this.orderHistoryLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {OrderSuccessfulPage};