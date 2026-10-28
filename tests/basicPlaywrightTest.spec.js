const {test, expect} = require('@playwright/test');

test('@smoke Page Playwright Test', async ({page})=>
{
    await page.goto("https://google.com");
    //get title and do the assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('@smoke Browser Context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName=page.locator("#username");
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    //get title and print
   console.log(await page.title());
   await userName.fill("rahulshetty");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect");

   await userName.fill("rahulshettyacademy");
   await signIn.click();
   await expect(page).toHaveTitle("ProtoCommerce");
   await expect(page.locator("app-shop .container .navbar-brand")).toHaveText("ProtoCommerce Home");
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").nth(1).textContent());
});

test("@smoke UI element actions", async({page})=>{
    const userName=page.locator("#username");
    const password=page.locator("[type='password']");
    const typeOfUserRadioBtn=page.locator("#usertype");
    const okayBtn=page.locator("#okayBtn");
    const userDropDown=page.locator("select.form-control");
    const termCheckBox=page.locator("#terms");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await typeOfUserRadioBtn.last().click();
    await expect(typeOfUserRadioBtn.last()).toBeChecked();
    console.log(typeOfUserRadioBtn.last().isChecked());
    await okayBtn.click();
    await userDropDown.selectOption("consult");
    await termCheckBox.click();
    await expect(termCheckBox).toBeChecked();
    await termCheckBox.uncheck();
    await expect(termCheckBox).not.toBeChecked();
    //blinking assertion
    const linkText=page.locator("[href*='documents-request']");
    await expect(linkText).toHaveAttribute("class" , "blinkingText");
});

test("@smoke switching tabs", async ({browser}) => {
   const context = await browser.newContext();
   const page= await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise");
   const linkText=page.locator("[href*='documents-request']");
   //To handle the new tabs
   const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    linkText.click()
   ]);
   const text=await newPage.locator(".red").first().textContent();
   console.log(text);
   const arraytext=text.split("@");
   const domain=arraytext[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").fill(domain);
});
