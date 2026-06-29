const {test,expect,request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"Turkey",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll( async() => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    
})


test('Client App Login', async({page})=> {

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
  
     await page.goto("https://rahulshettyacademy.com/client");
    
     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
          const response = await page.request.fetch(route.request());
          let body = JSON.stringify(fakePayLoadOrders);
          route.fulfill(
            {
              response,
              body, 
     
            });
          //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });
     
      await page.locator("button[routerlink*='myorders']").click();
      await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
     
      console.log(await page.locator(".mt-4").textContent());
    

})

