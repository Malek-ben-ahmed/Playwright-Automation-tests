import { log } from "node:console";
import { RegisterPage } from "../Pages/RegisterPage";
import { test,expect } from "@playwright/test";

test('Register with valid data in all required fields',async({page})=>{
    const RegisterPage=new RegisterPage(page)
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('My');
    await RegisterPage.enterLastName('testing');
    await RegisterPage.enterEmail('welcometoMytest@gmail.com')
    await RegisterPage.enterPassword('hellotest.');
    await RegisterPage.enterConfPassword('hellotest.');
    await RegisterPage.clickRegisterButton();
    const success_registration=await page.locator('.result').textContent();
    await expect(success_registration).toMatch(/Your registration completed|Votre inscription est terminée/);
})

test('Register with an invalid email format',async({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('Jane');
    await RegisterPage.enterLastName('Tomas');
    await RegisterPage.enterEmail('JaneTomasgmail.com')
    await RegisterPage.enterPassword('janetomas123');
    await RegisterPage.enterConfPassword('janetomas123');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/Wrong email|Adresse e-mail erronée/);
})

test('Register with a password confirmation different from the password',async({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectmalesexe();
    await RegisterPage.enterFirstName('Jane');
    await RegisterPage.enterLastName('frame');
    await RegisterPage.enterEmail('Janeframe@gmail.com');
    await RegisterPage.enterPassword('janeframes123');
    await RegisterPage.enterConfPassword('janeframes465');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/The password and confirmation password do not match.|Le mot de passe et le mot de passe de confirmation ne correspondent pas./);
});

test('Register while leaving one or more required fields empty',async ({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('');
    await RegisterPage.enterLastName('frame');
    await RegisterPage.enterEmail('hanaframe@gmail.com');
    await RegisterPage.enterPassword('hanaframe123');
    await RegisterPage.enterConfPassword('hanaframe123');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/First name is required.|Le prénom est obligatoire./);   
        })

test('Register with an email already used by another account',async({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('Jane');
    await RegisterPage.enterLastName('frame');
    await RegisterPage.enterEmail('Janeframe@gmail.com');
    await RegisterPage.enterPassword('janeframe123');
    await RegisterPage.enterConfPassword('janeframe123');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.validation-summary-errors').textContent();
    await expect(error_message).toMatch(/L'adresse e-mail spécifiée existe déjà.|The specified email already exists/);
});

test('Register with a password shorter than 6characters',async ({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('Jihen');
    await RegisterPage.enterLastName('fr');
    await RegisterPage.enterEmail('Jihenefr@gmail.com');
    await RegisterPage.enterPassword('ji123');
    await RegisterPage.enterConfPassword('ji123');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/Le mot de passe doit comporter au moins 6 caractères.|The password should have at least 6 characters./);
});

test('Register with only spaces in text fields',async ({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('     ');
    await RegisterPage.enterLastName('fr');
    await RegisterPage.enterEmail('jihenfr@gmail.com');
    await RegisterPage.enterPassword('jihenfr123');
    await RegisterPage.enterConfPassword('jihenfr123');
    await RegisterPage.clickRegisterButton();
    const error_message=await page.locator('.field-validation-error').textContent();
    await expect(error_message).toMatch(/First name is required.|Le prénom est obligatoire./);
})

test('Register with special characters in First Name or Last Name',async ({page})=>{
    const RegisterPage=new RegisterPage(page);
    await RegisterPage.gotoRegisterPage();
    await RegisterPage.selectfemalesexe();
    await RegisterPage.enterFirstName('maila//');
    await RegisterPage.enterLastName('tay');
    await RegisterPage.enterEmail('maila@gmail.com');
    await RegisterPage.enterPassword('maila123');
    await RegisterPage.enterConfPassword('maila123');
    await RegisterPage.clickRegisterButton();
    const success_registration=await page.locator('.result').textContent();
    await expect(success_registration).toMatch(/Your registration completed|Votre inscription est terminée/);
})
