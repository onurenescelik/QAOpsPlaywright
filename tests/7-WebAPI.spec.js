const {test,expect,request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');
const { table } = require('node:console');

const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"Turkey",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
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
    
   
    //my orders
    await page.locator("button[routerlink*=myorders]").click();
    const tableRows = page.locator('tbody tr');
    await tableRows.first().waitFor();
    const tableRowsCount = await page.locator('tbody tr').count(); //burda buna gerek kalmadan yuukrıda ıcın for içinde direkt tableRows.count() da yapılabilir. locatore await ekleyerek
    //const orderIdColums = page.locator("tbody tr th");
    //const orderDetails = page.locator("//button[text()='View']");
    const orderDetailsMessage = page.locator("div.email-title");
    const summaryOrderId = page.locator("div.col-text.-main");
    const cleanedOrderId = response.orderId.replace(/[|\s]/g, "");
    

    //find my order
    for (let i = 0; i < tableRowsCount; i++) {

        const currentRows = tableRows.nth(i);
        const currentOrderId = await currentRows.locator("th").textContent();

        //2. yol
        //const currentRows = await tableRows.nth(i).locator("th").textContent();
        //if(cleanedOrderId.includes(currentRows)){
        //await tableRows.nth(i).locator("button").first().click();
        //break;
        //}

        if(currentOrderId.trim()===cleanedOrderId){
        
            await currentRows.locator("button:has-text('View')").click();
            break;
            
            
        }
        
        
        
    }
    //await page.pause();
    await expect(orderDetailsMessage).toHaveText(/.*order summary.*/i);
    console.log(await orderDetailsMessage.textContent());

    await expect(summaryOrderId).toHaveText(cleanedOrderId);

    

})

