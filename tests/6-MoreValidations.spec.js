const {test,expect} = require('@playwright/test');

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});
test('test', async({page})=>{  

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());  //js popup oldugu durumda bu sekilde ok veya cancel edilebilir. oncesinde bir aksyion olacagı haber verilir
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    const framesPage = page.frameLocator('#courses-iframe'); // iframe oldugu durumda kullanılması gereken method
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();  //visible: 2 tane element bulundu ama biri hidden bu durumda visible olanı sadece almak için bu sekilde kullanılır
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]); //text: Join 13,522 Happy Subscibers! burada boslukları index olarak kullandırıp sadece sayıyı çekmek için 1. index'i aldık.
    

})

test("Screenshot & Visual Comparision", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialScrennshot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'scrennshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();

});

test("Visual Compare", async({page}) => {

    await page.goto("https://stackoverflow.com/questions");
    expect(await page.screenshot()).toMatchSnapshot('landing.png'); // test result içine kayıt gelir. Hata varsa expected - actual - diff olarak, yoksa tek png olarak kaydedilir.

})

test("ai multiple - loading page", async({page}) => {
    test.setTimeout(60000);
    await page.goto("https://aimultiple.com/datacenter-proxy");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000); 
    

   // --- EN DİBE KADAR KAYDIRMA (KESİN ÇÖZÜM) ---
   await page.evaluate(async () => {
    await new Promise((resolve) => {
        let lastHeight = document.body.scrollHeight;
        let timer = setInterval(() => {
            window.scrollBy(0, 600); // 600px aşağı kaydır
            let newHeight = document.body.scrollHeight;
            
            // Eğer sayfa artık uzamıyorsa (en dibe gelindiyse)
            // ya da çok fazla deneme yapıldıysa dur
            if (window.innerHeight + window.scrollY >= newHeight) {
                clearInterval(timer);
                resolve();
            }
        }, 200); // Sayfanın içeriği render etmesi için 200ms bekle
    });
});

// Sayfayı en başa çek ve resimlerin netleşmesi için bekle
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(3000); 
// --- BİTİŞ ---
    
    //expect(await page.screenshot()).toMatchSnapshot('landing.png');
    //expect(page).toHaveScreenshot('landing.png')
   expect( await page.screenshot({ 
        path: 'full-page-stack.png', 
        fullPage: true 
    })).toMatchSnapshot('landing.png');
})

