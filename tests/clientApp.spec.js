const {test, expect} = require('@playwright/test');

test('@smoke testcase1', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.locator(".login-section-wrapper .login-title")).toBeVisible();
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body b").allTextContents());
});