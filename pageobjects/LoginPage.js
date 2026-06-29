class LoginPage {


    constructor(page){

        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
            waitUntil: 'networkidle' 
        });
    }

    
    async validLogin(username, password){

        await this.userName.fill(username);
        await this.userPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle'); //network yüklenene kadar bekle (her zaman saglıklı calısma orn. resimlerin yuklenememesi)

    }
        

    

}

module.exports = { LoginPage };
