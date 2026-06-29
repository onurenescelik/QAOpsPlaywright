const {test, expect} = require ('@playwright/test');

test('Client App Login', async({page}) =>{

    const productName = "ZARA COAT 3";
    const email = "anshika@gmail.com";
    const products = page.locator('div.card-body')
    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
    await page.getByRole("button",{name: 'Login'}).click();

    await page.waitForLoadState('networkidle'); //network yüklenene kadar bekle (her zaman saglıklı calısma orn. resimlerin yuklenememesi)
    await page.locator(".card-body b").first().waitFor(); //sonraki islemde test yapacagımız locator yuklenene kadar bekle (first kullanmamızın sebebi birden cok sonuc buldugu için birini almak zorundayız bu method için)
   
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
    .getByRole("button",{name: " Add To Cart"}).click(); //ürünlerin hespini alır, bir tanesini filtreler ve filtrelediği ürünü sepete ekler.

    //go to cart
    await page.getByRole("listitem").getByRole("button",{name: 'Cart'}).click(); //getByRole("listitem") burda cart rolünde birden fazla buton oldugu için oncesinde parent'ını alıp o şekilde uniqueleştirdik.

    await page.locator('div li').first().waitFor(); // playwright'da auto waiting yöntemlerinde isVisible() yer almıyor. Cart sayfasınında ürünlerin yüklenmesinden emin olmak adına ilgili locate'i verip bekleme methodlarında biri olan waitFor() kullanılır.
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    //checkout
    await page.getByRole("button",{name: "Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("tur") //pressSequentially() methodu teker teker harflerin girilmesini sağlar
                                                                                         // delay ise her bir harf yazıldıktan sonra bekleme süresi
    await page.getByRole("button",{name: "Turkey"}).nth(0).click();
    await page.getByText("PLACE ORDER").click();


    //Order
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    

})
