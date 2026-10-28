const {test , expect}=require('@playwright/test')

test("Handling Popups and Frames", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.getByRole('button', {name : "Hide"}).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    page.on('dialog', dialog =>dialog.accept());
    await page.getByRole('button', {name:"Confirm"}).click();

    const framesPage=await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textCheck=await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

    

});