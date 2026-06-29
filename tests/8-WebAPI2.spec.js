const {test, expect} = require ('@playwright/test');

let webContext;
let email="anshika@gmail.com";
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); //network yüklenene kadar bekle (her zaman saglıklı calısma orn. resimlerin yuklenememesi)
   await context.storageState({path:'state.json'});
   webContext = await browser.newContext({storageState:'state.json'})
})

test('Client App Login', async() =>{

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('div.card-body')
    await page.locator(".card-body b").first().waitFor(); //sonraki islemde test yapacagımız locator yuklenene kadar bekle (first kullanmamızın sebebi birden cok sonuc buldugu için birini almak zorundayız bu method için)
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
      if( await products.nth(i).locator("b").textContent() === productName){  //products.nth(i) dinamik locator -> sonuna .locator ile onun childlarına ulaşılanbiliyor

        //add to cart
        await products.nth(i).locator("text = Add To Cart").click();
        break;
      }
    }
    //go to cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor(); // playwright'da auto waiting yöntemlerinde isVisible() yer almıyor. Cart sayfasınında ürünlerin yüklenmesinden emin olmak adına ilgili locate'i verip bekleme methodlarında biri olan waitFor() kullanılır.
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // bu sekilde yazmamızın sebebi bir önceki sayfada olan ZARA COAT 3 isimli ürünü görmediğinde yani sepette kontrol ettiğinden emin olmak adına locate alırken h3 tag,'ı kullandık diğerinde b tag'ı vardı böylece sepet sayfasında kontrol edeceğimizden emin olduk.
    expect(bool).toBeTruthy();

    //checkout
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially('tur',{delay:100}); //pressSequentially() methodu teker teker harflerin girilmesini sağlar
                                                                                         // delay ise her bir harf yazıldıktan sonra bekleme süresi
    const dropdown = page.locator("section.ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
        
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === ' Turkey') {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator("input.txt").nth(1).fill("123"); //CVV
    await page.locator("input.txt").nth(2).fill("onur celik"); //name on card
    await page.locator('select.input.ddl').nth(1).selectOption('27'); // expiry year


    //Order
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); //.em-spacer-1 .ng-star-inserted parent child olarak alırsak daha spesifik hale getirebiliriz arada bosluk var
    const cleanedOrderId = orderId.replace(/[|\s]/g, "");

    //my orders
    await page.locator("button[routerlink*=myorders]").click();
    const tableRows = page.locator('tbody tr');
    await tableRows.first().waitFor();
    const tableRowsCount = await page.locator('tbody tr').count(); //burda buna gerek kalmadan yuukrıda ıcın for içinde direkt tableRows.count() da yapılabilir. locatore await ekleyerek
    //const orderIdColums = page.locator("tbody tr th");
    //const orderDetails = page.locator("//button[text()='View']");
    const orderDetailsMessage = page.locator("div.email-title");
    const summaryOrderId = page.locator("div.col-text.-main");
    

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

test('test 2', async() =>{

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('div.card-body')
    await page.locator(".card-body b").first().waitFor(); //sonraki islemde test yapacagımız locator yuklenene kadar bekle (first kullanmamızın sebebi birden cok sonuc buldugu için birini almak zorundayız bu method için)
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
})

test('test 3', async() =>{

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('div.card-body')
    await page.locator(".card-body b").first().waitFor(); //sonraki islemde test yapacagımız locator yuklenene kadar bekle (first kullanmamızın sebebi birden cok sonuc buldugu için birini almak zorundayız bu method için)
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
})

test('test 4', async() =>{

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('div.card-body')
    await page.locator(".card-body b").first().waitFor(); //sonraki islemde test yapacagımız locator yuklenene kadar bekle (first kullanmamızın sebebi birden cok sonuc buldugu için birini almak zorundayız bu method için)
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
})


