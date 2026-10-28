const {test, expect, request}=require('@playwright/test'); //added request in fixtures
const { APIUtils } = require('./utils/APIUtils');

const loginPayLoad={userEmail: "bharath01@gmail.com", userPassword: "Simplify@@123"};
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let response;
test.beforeAll(async()=>{
   const apiContext=await request.newContext();
   const apiUtils=new APIUtils(apiContext, loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);
});

test('Adding the product to cart', async({page})=>
    {
    await page.addInitScript(value =>
        {
        window.localStorage.setItem('token',value);
        }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderIDRows=page.locator("tbody tr");
    for(let i=0; i<await orderIDRows.count(); ++i)
    {
       const rowIDs=await orderIDRows.nth(i).locator("th").textContent();
       if(response.orderID.includes(rowIDs))
       {
         await orderIDRows.locator("button").first().click();
         break;
       }
    }
    await expect(page.locator(".email-container .email-title")).toHaveText(" order summary ");
    const oderIDDetails=await page.locator("div[class='col-text -main']").textContent();
    expect(response.orderID.includes(oderIDDetails)).toBeTruthy();
});