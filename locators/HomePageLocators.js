// HomePageLocators.js
export class HomePageLocators {
  constructor(page) {
    this.allLinksLocator = page.locator('a');
    this.signInLink=page.locator('a:has-text("Sign in")'),
    this.moneyLinkLocator = page.getByRole('link', { name: 'Money' }).first()
    this.createAccountLinkLocator = page.locator('a:has-text("Create Account")');
  }
}
