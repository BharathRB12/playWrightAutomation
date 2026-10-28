const {test, expect}=require('@playwright/test');

test("Order the item and check the ordered item", async ({browser})=>{
   const context = await browser.newContext();
   const page=await context.newPage();

   const productName='ZARA COAT 3';
   const email="bharath01@gmail.com";
   const password="Simplify@@123";
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");
   expect(await page.locator(".login-section-wrapper .login-title")).toBeVisible();
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill(password);
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body").first().waitFor();
   const count = await products.count();
   for(let i=0; i<count; ++i)
   {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.waitForLoadState('networkidle');
   await page.locator("div li").first().waitFor();
   const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   await expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.waitForLoadState('networkidle');


   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
  await page.locator("text=Place Order ").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
  const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderID);
  await page.locator(".em-spacer-1 [routerlink*='myorders']").click();
  await page.locator("table").waitFor();
  const rows=page.locator("tbody tr");
  const rowCount = await rows.count();
  for(let i=0; i<rowCount; ++i)
  {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if(orderID.includes(rowOrderId))
    {
      rows.locator(".btn-primary").first().click();
      break;
    }
  }
  await expect(page.locator(".email-title")).toHaveText(" order summary ");
  const orderIDDetails=await page.locator(".col-text").textContent();
  await expect(orderID.includes(orderIDDetails)).toBeTruthy();

});
