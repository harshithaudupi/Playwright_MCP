import { SignInPageLocators } from '../locators/SignInPageLocators.js';

export class SignInPage {
   constructor(page) {
           this.page = page;
           // Locators
           this.locators = new SignInPageLocators(page);
          
       }

  

    async signIn(username, password) {
        await this.locators.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.signInButton.click();
    }

    async enterCode(code) {
        await this.locators.codeInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.locators.codeInput.fill(code);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getErrorMessage() {
        await this.locators.errorMsg.waitFor({ state: 'visible' });
        return this.locators.errorMsg.textContent();
    }
}
