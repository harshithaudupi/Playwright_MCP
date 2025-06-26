import { MoneyPageLocators } from '../locators/MoneyPageLocators.js';
export class MoneyPage {
  constructor(page) {
          this.page = page;
          // Locators
          this.locators = new MoneyPageLocators(page);
         
    }/**
     * Click on the Insurance link
     */ async navigateToInsurance() {
        
            await this.locators.insuranceLinkLocator.waitFor({ state: 'visible', timeout: 10000 });
            await this.locators.insuranceLinkLocator.click();
            
    }  
}
