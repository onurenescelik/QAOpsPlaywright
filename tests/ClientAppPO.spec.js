 const {test, expect} = require('@playwright/test');
 const {customtest} = require('../utils/test-base');
 const {POManager} = require('../pageobjects/POManager');
 // Doğrudan JavaScript nesnesine dönüşür:
const dataSet = require("../utils/placeorderTestData.json");

for(const data of dataSet){ //json da olan verileri sırası getirir 
 test(`Client App login for ${data.productName} `, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


    //Zara Coat 4

 });

}

customtest('@Web Client App login', async ({page,testDataForOrder})=>
  {
    const poManager = new POManager(page);
     //js file- Login js, DashboardPage
      const products = page.locator(".card-body");
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();
 
     const cartPage = poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
     await cartPage.Checkout();
  });



 



 

