const {test, expect} = require ('@playwright/test');

test('Register And List All Products', async({browser}) =>{

    const contex = await browser.newContext();
    const page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const register = page.locator('a[href="#/auth/register"]');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const eMail = page.locator('#userEmail');
    const phoneNumber = page.locator('#userMobile');
    const occupation = page.locator('select[formcontrolname="occupation"]');
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const gender = (genderValue) => page.locator(`input[value="${genderValue}"]`);
    const formControl = page.locator('input[formcontrolname="required"]');
    const login = page.locator('#login');
    const successMessage = page.locator('h1.headcolor');
    const loginButton = page.locator('button.btn.btn-primary');

    await register.click();
    await firstName.fill('onen4');
    await lastName.fill('onurs4');
    await eMail.fill('onen4@gmail.com');
    await phoneNumber.fill('5555555554')
    await occupation.selectOption({ label: 'Engineer' });
    await password.fill('12345678Cc&');
    await confirmPassword.fill('12345678Cc&');
    await gender('Male').check();
    await formControl.check();

    await login.click();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Account Created Successfully');
    await loginButton.click();

    await eMail.fill('onen4@gmail.com');
    await password.fill('12345678Cc&');
    await login.click();

    //await page.waitForLoadState('networkidle'); // 1. seçenek -> network yüklenene kadar bekle
    await page.locator(".card-body b").first().waitFor(); //2.secenek -> birden fazla veri döndüğü için direkt waitfor() methodu kullanılamaz o yzüden first() methodu ile beraber kullanıldı
    const titles = await page.locator(".card-body b").allTextContents(); // bütün verileri liste olark döndüğü için liste boşta dönebilir hata vermez.
                                                                         // bundan dolayı sayfa biraz bile geç yüklense bos liste döner.
    console.log(titles);






})