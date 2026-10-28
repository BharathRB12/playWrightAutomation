const { test, expect } = require('@playwright/test');

test('Intercepting network request', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.locator(".login-section-wrapper .login-title")).toBeVisible();
    await page.locator("#userEmail").fill("bharath01@gmail.com");
    await page.locator("#userPassword").fill("Simplify@@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({
    url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
    })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
}
);