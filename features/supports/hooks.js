const { Before, After, BeforeStep, Status, AfterStep } = require("@cucumber/cucumber");
const { chromium } = require('@playwright/test');
const { POManger } = require('../../pageObjects/POManager');

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManger(this.page);
});
 BeforeStep(function(){

 })

 AfterStep(async function({result})
 {
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
 })

After(async function(){
    await console.log("testcase finished");
})