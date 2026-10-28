const { test, expect } = require('@playwright/test');

test('screenshot and visual testing', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").isVisible();
    await page.locator("#displayed-text").screenshot({path:"textbox.jpg"});
    await page.locator("#hide-textbox").click();
    await page.locator("#displayed-text").isHidden();
    await page.screenshot({path : "page.jpg"});
});

test('visual testing', async({page}) =>{
   await page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
   expect(await page.screenshot()).toMatchSnapshot('homePage.png');
});