import { log } from "node:console";
import { registerPage } from "../Pages/registerPage";
import { test,expect } from "@playwright/test";

test('Register with valid data in all required fields',async({page})=>{
    const registerPage=new registerPage(page)
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('My');
    await registerPage.enterLastName('testing');
    await registerPage.enterEmail('welcometoMytest@gmail.com')
    await registerPage.enterPassword('hellotest.');
    await registerPage.enterConfPassword('hellotest.');
    await registerPage.clickRegisterButton();
    const success_registration=await page.locator('.result').textContent();
    await expect(success_registration).toMatch(/Your registration completed|Votre inscription est terminée/);
})

test('Register with an invalid email format',async({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('Jane');
    await registerPage.enterLastName('Tomas');
    await registerPage.enterEmail('JaneTomasgmail.com')
    await registerPage.enterPassword('janetomas123');
    await registerPage.enterConfPassword('janetomas123');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/Wrong email|Adresse e-mail erronée/);
})

test('Register with a password confirmation different from the password',async({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectmalesexe();
    await registerPage.enterFirstName('Jane');
    await registerPage.enterLastName('frame');
    await registerPage.enterEmail('Janeframe@gmail.com');
    await registerPage.enterPassword('janeframes123');
    await registerPage.enterConfPassword('janeframes465');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/The password and confirmation password do not match.|Le mot de passe et le mot de passe de confirmation ne correspondent pas./);
});

test('Register while leaving one or more required fields empty',async ({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('');
    await registerPage.enterLastName('frame');
    await registerPage.enterEmail('hanaframe@gmail.com');
    await registerPage.enterPassword('hanaframe123');
    await registerPage.enterConfPassword('hanaframe123');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/First name is required.|Le prénom est obligatoire./);   
        })

test('Register with an email already used by another account',async({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('Jane');
    await registerPage.enterLastName('frame');
    await registerPage.enterEmail('Janeframe@gmail.com');
    await registerPage.enterPassword('janeframe123');
    await registerPage.enterConfPassword('janeframe123');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.validation-summary-errors').textContent();
    await expect(error_message).toMatch(/L'adresse e-mail spécifiée existe déjà.|The specified email already exists/);
});

test('Register with a password shorter than 6characters',async ({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('Jihen');
    await registerPage.enterLastName('fr');
    await registerPage.enterEmail('Jihenefr@gmail.com');
    await registerPage.enterPassword('ji123');
    await registerPage.enterConfPassword('ji123');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/Le mot de passe doit comporter au moins 6 caractères.|The password should have at least 6 characters./);
});

test('Register with only spaces in text fields',async ({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('     ');
    await registerPage.enterLastName('fr');
    await registerPage.enterEmail('jihenfr@gmail.com');
    await registerPage.enterPassword('jihenfr123');
    await registerPage.enterConfPassword('jihenfr123');
    await registerPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/First name is required.|Le prénom est obligatoire./);
})

test('Register with special characters in First Name or Last Name',async ({page})=>{
    const registerPage=new registerPage(page);
    await registerPage.gotoregisterPage();
    await registerPage.selectfemalesexe();
    await registerPage.enterFirstName('maila//');
    await registerPage.enterLastName('tay');
    await registerPage.enterEmail('maila@gmail.com');
    await registerPage.enterPassword('maila123');
    await registerPage.enterConfPassword('maila123');
    await registerPage.clickRegisterButton();
    const success_registration=await page.locator('.result').textContent();
    await expect(success_registration).toMatch(/Your registration completed|Votre inscription est terminée/);
})
