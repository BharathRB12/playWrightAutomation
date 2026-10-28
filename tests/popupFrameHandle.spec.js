const { test , expect } = require('@playwright/test');

test("Handling Popups, dialog and frames", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com");
    // await page.pause();
    // await page.goBack();
    // await page.goForward();
    
    await page.locator("#displayed-text").isVisible();
    await page.locator("#hide-textbox").click();
    await page.locator("#displayed-text").isHidden();

    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());

    await page.locator("#mousehover").hover();

    const framePage=page.frameLocator("#courses-iframe");
    await framePage.locator("li[class='current'] a:visible").click();
    const text=await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

});

