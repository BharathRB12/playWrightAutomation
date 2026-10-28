class YourOrderPage
{
    constructor(page)
    {
        this.page = page;
        this.orderTable = page.locator("table");
        this.rows=page.locator("tbody tr");
    }

    async navigateToOrderDetailsPage(orderID)
    {
        await this.orderTable.waitFor();
        const rowCount = await this.rows.count();
        for(let i=0; i<rowCount; ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
             if(orderID.includes(rowOrderId))
                {
                    await this.rows.locator(".btn-primary").first().click();
                    break;
                }
        }
    }
}

module.exports = {YourOrderPage};