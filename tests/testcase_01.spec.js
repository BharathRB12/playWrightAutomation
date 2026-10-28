const {test, expect}=require('@playwright/test');

test('Adding the product to cart', async({page})=>{
    const productName='ZARA COAT 3';
    const email="bharath01@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.locator(".login-section-wrapper .login-title")).toBeVisible();
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Simplify@@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles=await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const products=page.locator(".card-body");
    const count=await products.count();
    for(let i=0; i<count; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
           await products.nth(i).locator("text= Add To Cart").click();
           break;
        }
    }
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("button:has-text('Checkout')").click();
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
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdownOption=await page.locator("section[class*='ta-results']");
    await dropdownOption.waitFor();
    const countOfOptions=await dropdownOption.locator("button").count();
    for(let i=0; i<countOfOptions; ++i)
    {
        if(await dropdownOption.locator("button").nth(i).textContent() === " India")
        {
           await dropdownOption.locator("button").nth(i).click();
           break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await expect(page.locator(".product-info-column .title").first()).toHaveText(productName);
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderIDRows=page.locator("tbody tr");
    for(let i=0; i<await orderIDRows.count(); ++i)
    {
       const rowIDs=await orderIDRows.nth(i).locator("th").textContent();
       if(orderID.includes(rowIDs))
       {
         await orderIDRows.locator("button").first().click();
         break;
       }
    }
    await expect(page.locator(".email-container .email-title")).toHaveText(" order summary ");
    const oderIDDetails=await page.locator("div[class='col-text -main']").textContent();
    expect(orderID.includes(oderIDDetails)).toBeTruthy();
});