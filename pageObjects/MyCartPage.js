const { expect } = require('@playwright/test');

class MyCartPage
{
    constructor(page, productName)
    {
        this.page=page;
        this.firstCartProduct=page.locator("div li").first();
        //this.cartAddedProduct = page.locator(`h3:has-text("${productName}")`);
        this.checkOutBtn=page.locator("text=Checkout");
    }

    async validateAddedProduct(productName)
    {
        await this.firstCartProduct.waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
    }
    async navigateToPayment()
    {
        await this.checkOutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports={MyCartPage};