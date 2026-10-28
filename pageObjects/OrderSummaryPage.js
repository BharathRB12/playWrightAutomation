const { expect } = require("@playwright/test");

class OrderSummaryPage
{
    constructor(page)
    {
        this.page = page;
        this.pageHeader = page.locator(".email-container .email-title");
        this.orderIDDetails = page.locator(".col-text");
    }

    async validateOrderProduct(orderID)
    {
        await expect(this.pageHeader).toHaveText(" order summary ");
        const orderIDDetails = await this.orderIDDetails.textContent();
        await expect(orderID.includes(orderIDDetails)).toBeTruthy();
    }
}

module.exports = {OrderSummaryPage};