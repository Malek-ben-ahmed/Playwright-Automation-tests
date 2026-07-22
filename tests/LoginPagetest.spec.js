import {test,expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test('Login  with an invalid email',async({page})=>{
    const loginPage=new LoginPage(page)
    await loginPage.gotoLoginPage();
    await loginPage.enterEmail('welcomeheretoMytestgmail.com');
    await loginPage.enterPassword('hellotest.');
    await loginPage.clickLoginButton();
    expect(await page.locator('.field-validation-error').textContent()).toMatch(/Please enter a valid email address.|S'il vous plaît, mettez une adresse email valide./);
})
test('Login with inexisting or empty email',async({page})=>{
    const loginPage=new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.enterEmail('inexistingemail@gmail.com');
    await loginPage.enterPassword('hellotest.');
    await loginPage.clickLoginButton();
    expect(await page.locator('.message-error').textContent()).toMatch(/La connexion a échoué. Veuillez corriger les erreurs et réessayer.|Login was unsuccessful. Please correct the errors and try again.|No customer account found|Aucun compte client trouvé/);

})
test('Login with inexisting or empty pwd',async({page})=>{
    const loginPage=new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.enterEmail('malekbenahmed2008@gmail.com');
    await loginPage.enterPassword('inexistingpwd');
    await loginPage.clickLoginButton();
    expect(await page.locator('.message-error').textContent()).toMatch(/La connexion a échoué. Veuillez corriger les erreurs et réessayer.|Login was unsuccessful. Please correct the errors and try again.|Les informations d'identification fournies sont incorrectes.|The credentials provided are incorrect/);
})
test.only('Login with a valid email and pwd',async({page})=>{
    const loginPage=new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.enterEmail('malekbenahmed2008@gmail.com');
    await loginPage.enterPassword('Malek123');
    await loginPage.clickLoginButton();
    expect(await page.url()).toBe('https://demowebshop.tricentis.com/');
})