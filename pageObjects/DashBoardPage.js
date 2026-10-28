class DashBoardPage
{
    constructor(page)
    {  
        this.page=page;
        this.products = page.locator(".card-body");
        this.cartLink= page.locator("[routerlink*='cart']");
    }
    async searchItemAndAddToCart(productName)
    {
        const count = await this.products.count();
        for(let i=0; i<count; ++i)
        {
             if(await this.products.nth(i).locator("b").textContent() === productName)
                {
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
                }
        }
    }
    async navigateToCartPage()
    {
        await this.cartLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports={DashBoardPage};