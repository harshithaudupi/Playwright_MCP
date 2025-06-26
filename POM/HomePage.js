import { HomePageLocators } from '../locators/HomePageLocators.js';
export class HomePage {
    /**
     * Constructor for the HomePage class.
     * @param {Page} page - The Playwright Page object.
     */
    constructor(page) {

      this.page = page;
      this.locators = new HomePageLocators(page);
   
   
    }
  
    /**
     * Navigates to the Rediff homepage.
     * @returns {Promise<void>}
     */
    async goToRediffPage() {
      await this.page.goto('https://www.rediff.com/', { waitUntil: 'load' }); // Go to the Rediff homepage and wait for it to load
    }
  
    /**
     * Navigates to the Create Account page by clicking the 'Create Account' link.
     * @returns {Promise<void>}
     */
    async navigateToCreateAccount() {
      await this.locators.createAccountLinkLocator.waitFor({ state: 'visible', timeout: 15000 });
      await this.locators.createAccountLinkLocator.click();
      console.log('Clicked the Create Account link.');
    }
  
    /**
     * Retrieves all links on the page.
     * @returns {Locator} - The locator for all anchor tags on the page.
     */
    getAllLinks() {
      return this.locators.allLinksLocator; // Returns the locator for all links
    }
  
    /**
     * Retrieves the title of the current page.
     * @returns {Promise<string>} - A promise that resolves to the page title.
     */
    async getPageTitle() {
      return this.page.title(); // Returns the title of the current page
    }
  
    /**
     * Retrieves the number of links on the page.
     * @returns {Promise<number>} - A promise that resolves to the number of links.
     */
    async getLinksCount() {
      return await this.locators.allLinksLocator.count(); // Returns the number of links found by the locator
    }
  
    
    /**
     * Navigates to the Sign in Page
     * @returns {Promise<void>}
     */
    async gotoSignIn() {
        await this.locators.signInLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.locators.signInLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    /**
     * Navigates to the Money section
     * @returns {Promise<void>}
     */
    async navigateToMoney() {
        await this.locators.moneyLinkLocator.waitFor({ state: 'visible' });
        await this.locators.moneyLinkLocator.click();
    }
  
   
  }
