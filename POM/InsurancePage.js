import { InsurancePageLocators } from '../locators/InsurancePageLocators.js';
export class InsurancePage {
  constructor(page) {
      this.page = page;
      // Locators using imported locator selectors
      this.locators = new InsurancePageLocators(page);
  
    }
 

    /**
     * Search for a company and select it from suggestions
     * @param {string} companyName - The name of the company to search for
     */    async searchAndSelectCompany(companyName) {
        await this.locators.companySearchBoxLocator.waitFor({ state: 'visible',timeout: 10000 });
        await this.locators.companySearchBoxLocator.click();
        await this.locators.companySearchBoxLocator.fill(companyName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

   
}
