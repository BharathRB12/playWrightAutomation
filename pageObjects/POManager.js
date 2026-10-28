const {LoginPage} =require('./LoginPage')
const {DashBoardPage} =require('./DashBoardPage')
const {MyCartPage} =require('./MyCartPage')
const {PaymentMethodPage} =require('./PaymentMethodPage')
const {OrderSuccessfulPage} =require('./OrderSuccessfulPage')
const {YourOrderPage} =require('./YourOrderPage')
const {OrderSummaryPage} =require('./OrderSummaryPage')

class POManger
{
    constructor(page, productName)
    {
        this.page=page;
        this.productName=productName;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage=new DashBoardPage(this.page);
        this.myCartpage=new MyCartPage(this.page,this.productName);
        this.paymentMethodPage=new PaymentMethodPage(this.page);
        this.orderSuccessfulPage = new OrderSuccessfulPage(this.page);
        this.yourOrderPage = new YourOrderPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
        getMyCartPage()
    {
        return this.myCartpage;
    }
     getPaymentMethodPage()
    {
        return this.paymentMethodPage;
    }
     getOrderSuccessfulPage()
    {
        return this.orderSuccessfulPage;
    }
     getYourOrderPage()
    {
        return this.yourOrderPage;
    }
     getOrderSummaryPage()
    {
        return this.orderSummaryPage;
    }
}

module.exports = {POManger};