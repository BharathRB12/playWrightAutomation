const {test, expect}=require('@playwright/test');

test('Adding the product to cart', async({page})=>{
    const productName='ZARA COAT 3';
    const email="bharath01@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.getByText("Log in")).toBeVisible();

    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Simplify@@123");
    await page.getByRole("button", {name: "Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
    
    await page.waitForLoadState('networkidle');
    await page.locator("li").getByRole("button", {name : "Cart" }).click();
    await page.locator("div li").first().waitFor();
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.getByRole("button", {name : "Checkout"}).click();
    await page.locator(".payment__title").first().waitFor();
    //filling Personal Information
    await page.locator(".input").first().fill("1234123412341234");
    await page.locator("select[class='input ddl']").first().selectOption("08");
    await page.locator("select[class='input ddl']").nth(1).selectOption("30");
    await page.locator("input[class='input txt']").first().fill("123");
    await page.locator("input[class='input txt']").nth(1).fill("Bharath");
    // await page.locator("input[name='coupon']").fill("Rahulshetty");
    // await page.locator("button[type='submit']").click();

    //shipping Information
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name : "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});