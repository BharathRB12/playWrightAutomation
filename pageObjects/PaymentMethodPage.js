const { expect } = require("@playwright/test");

class PaymentMethodPage
{
    constructor(page)
    {
        this.page = page;
        this.CountryDropdown = page.locator("[placeholder*='Country']")
        this.dropdownOptions = page.locator(".ta-results");
        this.emailTextbox = page.locator(".user__name [type='text']").first();
        this.placeOderBtn = page.locator("text=Place Order ");
    }

    async validateEmailSelectCountryPlaceOrder(country,email)
    {
        await expect(this.emailTextbox).toHaveText(email);
        await this.CountryDropdown.pressSequentially(country, {delay: 150});
        await this.dropdownOptions.waitFor();
      
       const optionsCount = await this.dropdownOptions.locator("button").count();
       for (let i = 0; i < optionsCount; ++i) {
          const text = await this.dropdownOptions.locator("button").nth(i).textContent();
          if (text === " India") {
             await this.dropdownOptions.locator("button").nth(i).click();
             break;
          }
       }
       await this.placeOderBtn.click();
       await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {PaymentMethodPage};