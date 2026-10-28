const {test, expect} = require('@playwright/test');

let webContext;
test.beforeAll(async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("bharath01@gmail.com");
    await page.locator("#userPassword").fill("Simplify@@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
});

test('Ordering the product', async()=>{
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage(); //injection cookies here
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator("li").getByRole("button", {name : "Cart" }).click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();
    await page.getByRole("button", {name : "Checkout"}).click();
    await page.locator(".payment__title").first().waitFor();
    //filling Personal Information
    await page.locator(".input").first().fill("1234123412341234");
    await page.locator("select[class='input ddl']").first().selectOption("08");
    await page.locator("select[class='input ddl']").nth(1).selectOption("30");
    await page.locator("input[class='input txt']").first().fill("123");
    await page.locator("input[class='input txt']").nth(1).fill("Bharath");
    //shipping Information
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name : "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});