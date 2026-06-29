const {test, expect} = require ('@playwright/test');
const { text } = require('node:stream/consumers');

test('Browser context playwright test', async ({browser}) =>{

    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url())); //sayfa acıldıgında atılan requestlerden url'leri ceker
    page.on('request',response=>console.log(response.url(),response.status()));//sayfa acıldıgında dönen response'lardan url'leri ve statusleri ceker
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //css
    await userName.fill('onurtest');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent()); // yıldız oldugunda partial oalrak alıyor yani devamı olabilir.
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent()); // first methodu ilkini alır
    console.log(await page.locator(".card-body a").nth(0).textContent()); // nth(0) ilk buldugunu alır
    const allTitles = await cardTitles.allTextContents(); // burada hepsini çektiği için spesifik bakmıyor ve aslında beklemiyor sayfanın yüklenmesini hiç yuklenmeden aldıgı durumdada liste bos donebilir ama hata vermez
    console.log(allTitles);

});

test('Page playwright test', async ({page}) =>{

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption('consult');
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
     //assertion
    console.log(page.locator(".radiotextsty").last().isChecked()); // true false döndürür
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); // assert eder

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //await expect(locator).not.toBeChecked(); daha iyi bir çözüm


    //await page.pause();
    
});

test('Child windows', async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([  // arrya döner. işlemlerin paralel çalışılması gerekiyorsa, Burada yeni sayfaya geçileceği için önceden veya sonradan bunu bildiremiyoruz eşzamansız(async) paralel hareket etmek gerek.
    context.waitForEvent('page'), //yeni bir sayfa acılacagını burda bildiriyoruz
    documentLink.click(), // yeni sayfa açılır
    ])
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@')
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);

   await  page.locator('#username').fill(domain);
   await page.pause();
   console.log(await page.locator('#username').inputValue()); //
    
    


});