class Event{

    constructor(page,user){
        this.page = page;
        this.user = user;
    }

    async loginAs(BASE_URL) {
        await this.page.goto(`${BASE_URL}/login`);
        await this.page.locator('#email').fill(this.user.email);
        await this.page.locator('#password').fill(this.user.password);
        await this.page.locator('#login-btn').click();
        await this.page.locator('#nav-events').click();
        await this.page.waitForURL('**/events');
    
    }

}

module.exports = {Event};