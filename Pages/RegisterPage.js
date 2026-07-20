export class RegisterPage{
    
    constructor(page){
        this.page = page;
    }
    async gotoRegisterPage(){
        await this.page.goto('https://demowebshop.tricentis.com/register');
    }
    async selectfemalesexe(){
        await this.page.locator('#gender-female').click() ;
    }
    async selectmalesexe(){
        await this.page.locator('gender-male').click() ;
    }
    async enterFirstName(firstname){
        await this.page.locator('#FirstName').fill(firstname);
    }
    async enterLastName(lastname){
        await this.page.locator('#LastName').fill(lastname);
    }
    async enterEmail(email){
        await this.page.locator('#Email').fill(email);
    }
    async enterPassword(password){
        await this.page.locator('#Password').fill(password);
    }
    async enterConfPassword(password){
        await this.page.locator('#ConfirmPassword').fill(password);
    }
    async clickRegisterButton(){
        await this.page.locator('#register-button').click();
    }

}