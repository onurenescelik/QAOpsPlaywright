const {test,expect} = require("@playwright/test");

test("Calendar Validations", async({page}) =>{
    
    const monthNumber = new Date().getMonth(); //0-11 arası geliyor 
    const date = new Date().getDate();
    const year = new Date().getFullYear();

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div.react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    //const value = await page.locator("input[name='date']").inputValue();
    
    const formattedDate =
    year + "-" +
    String(monthNumber + 1).padStart(2, '0') + "-" +
    String(date).padStart(2, '0');
    console.log(formattedDate);

  await expect(page.locator("input[name='date']")).toHaveValue(formattedDate);


});