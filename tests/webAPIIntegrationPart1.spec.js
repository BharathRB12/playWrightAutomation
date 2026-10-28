const {test, expect, request} = require('@playwright/test');
const reqPayload = {userEmail: "bharath01@gmail.com", userPassword: "Simplify@@123"};
let token;

test.beforeAll('login request',async ()=> {
    const apiContext= await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: reqPayload
        });
       await expect(loginResponse.ok()).toBeTruthy();
       const loginResponseJson = loginResponse.json();
       token=loginResponseJson.token;
});

test('Order Item', async ({page})=>{
    await page.addInitScript(value => {
    window.localStorage.setItem('token', value);}, token);
    await page.goto("https://rahulshettyacademy.com/api/ecom/auth/login");
    await page.pause();
    
});