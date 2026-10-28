const {test, expect}=require('@playwright/test');
const {POManger}=require('../pageObjects/POManager')
const dataset=JSON.parse(JSON.stringify(require('../testData/PlaceOrderTestData.json')))

for(const data of dataset)
{
test(`@smoke Order the item and check the ordered item for ${data.productName}`, async ({browser})=>{
   const context = await browser.newContext();
   const page=await context.newPage();

   const poManager = new POManger(page,data.productName);

   const loginPage=poManager.getLoginPage();
   await loginPage.goTo()
   await loginPage.validLogIn(data.email,data.password);
   const dashboardPage=poManager.getDashboardPage();
   await dashboardPage.searchItemAndAddToCart(data.productName);
   await dashboardPage.navigateToCartPage();
   const myCartpage=poManager.getMyCartPage();
   await myCartpage.validateAddedProduct(data.productName);
   await myCartpage.navigateToPayment();
   const paymentMethodPage=poManager.getPaymentMethodPage();
   await paymentMethodPage.validateEmailSelectCountryPlaceOrder(data.country, data.email);
   const orderSuccessfulPage = poManager.getOrderSuccessfulPage();
   const orderID= await orderSuccessfulPage.validateMessageAndStoreOrderID(data.message);
   await orderSuccessfulPage.navigateToOrderPage();
   const yourOrderPage = poManager.getYourOrderPage();
   await yourOrderPage.navigateToOrderDetailsPage(orderID);
   const orderSummaryPage = poManager.getOrderSummaryPage();
   await orderSummaryPage.validateOrderProduct(orderID);
});
}