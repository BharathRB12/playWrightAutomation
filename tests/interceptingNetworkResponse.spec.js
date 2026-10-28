const { test, expect, request } = require('@playwright/test'); //added request in fixtures
const { APIUtils } = require('./utils/APIUtils');

const loginPayLoad = { userEmail: "bharath01@gmail.com", userPassword: "Simplify@@123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayLoadOrder = { data: [], message: "No Orders" };;

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('validating no order found', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    //Intercepting Response: Get API Response->{API FakeResponse}->sent to Browser->Render Data on Front End Page
    //which URL want to route
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        //how to route
        async route => {
            //get the response
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrder);

            await route.fulfill({
                response,
                body
            });
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});