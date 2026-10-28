const {test, expect} = require('@playwright/test');

test("@smoke Browser Context Playwright Automation", async ({browser})=>
    {
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
       console.log(await page.title());
    });

test("@smoke Page Playwright Automation", async ({page})=>{
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google");
});

test("@smoke Basic UI Test Operation", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    const userName = page.locator('#username');
    const sigIn = page.locator("#signInBtn");
    await expect(page.locator('#login-form')).toBeVisible();
    await userName.fill("Bharath");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#terms").click();
    await sigIn.click();
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("rahulshettyacademy");
    await page.locator("#terms").click();
    await sigIn.click();
    await expect(page.locator(".card-body a").first()).toBeVisible();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});

test("@smoke element handling", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    const userName = page.locator('#username');
    const sigIn = page.locator("#signInBtn");
    const dropdown= page.locator('select.form-control');
   // await dropdown.selectOption('teach');
    await dropdown.selectOption({label:"Consultant"});
    expect(page.locator("[value='admin']")).toBeChecked();
    expect (await page.locator("[href*='documents-request']")).toHaveAttribute('class' ,'blinkingText');
});

test("@smoke Handling New Tabs", async({browser})=>{
   const context=await browser.newContext(); 
   const page=await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
   const userName = page.locator('#username');
    const documentLink=page.locator("[href*='documents-request']");
    await expect (page.locator("#username")).toBeVisible();
    const[newPage]=await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);
    const text=await newPage.locator(".red").textContent();
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    await page.pause();
});