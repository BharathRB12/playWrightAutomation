const {test, expect}=require('@playwright/test');

test("Validating Login Error Message",async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").fill("rahulshettyacademy ");
    await page.locator("[name='password']").fill("Learning@830$3mK2123");
    await page.locator("[name='terms']").click();
    await page.locator("#signInBtn").click();
    const errorMessage=await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("Page Testcase",async ({page})=>{
   page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("Learning@830$3mK2");
    await page.locator("span.radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator("span.radiotextsty").last()).toBeChecked();
    await page.locator("select.form-control").selectOption("Consultant")
    await page.locator("[name='terms']").click();
    await page.pause();
    await page.locator("#signInBtn").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body a").first().waitFor({state: 'visible', timeout:10000});
    const cardName=await page.locator(".card-body a").allTextContents();
    console.log(cardName);
});

test.only("Swicting between the tabs",async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    const documentLink= page.locator("[href*='documents-request']");
    const [newPage]=await Promise.all(
        [context.waitForEvent('page'),
        documentLink.click()
    ]);
   const text=await newPage.locator("p.red").textContent();
   console.log(text);
   const arrayText=text.split("@");
   const domain=arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").fill(domain);
   await page.pause();
});