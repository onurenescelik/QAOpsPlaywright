import { test, expect } from '@playwright/test';

test('Playwright Special Locators', async({page}) =>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click(); //Label tag'ı olan elementlerde kullanılır
    await page.getByLabel('Employed').check(); //radiobutton veya checkbox olan elementlerde click dışında check methoduda kullanılabilir.
    await page.getByLabel('Gender').selectOption('Male'); //select tag'ına sahipse selectoption kullanılabilir.
    await page.getByPlaceholder("Password").fill("abc123"); //placeHolder tag'ı varsa getByPlaceholder bu method da kullanılabilir
    await page.getByRole("button",{name:'Submit'}).click(); //getByRole bu method ile sayfada olan button vs(method içinde öneriliyor) alanları için locate almadan kullanılabilir.
    await expect (page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); 
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge'}).getByRole("button").click(); //locator("").filter({ hasText: 'Nokia Edge'}) burada filter, locator için birden fazla element bulunduğunda istenileni seçmek için filtreleme yapmamızı sağlar
                                                                                        // getByRole("button") burayı -> getByRole("button",{name:'Add'}) olarak yazmadık çünkü zaten bu locator da bir tane buton var
    

});