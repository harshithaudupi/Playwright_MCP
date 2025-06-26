// CreateAccountPageLocators.js
export class CreateAccountPageLocators {
  constructor(page) {
    this.allLinksLocator = page.locator('a');
    this.termsAndConditionsLinkLocator = page.locator('a:has-text("terms and conditions")');
    this.privacyPolicyLinkLocator = page.locator('a:has-text("privacy policy")');
    this.fullNameTextBoxLocator = page.getByPlaceholder('Enter your full name');
    this.rediffmailIdInputLocator = page.getByPlaceholder('Enter Rediffmail ID');
    this.checkAvailabilityButtonLocator = page.getByRole('button', { name: /Check Availability/i });
    this.passwordInputLocator = page.getByPlaceholder('Enter password');
    this.retypePasswordInputLocator = page.getByPlaceholder('Retype password');
    this.dobDaySelectLocator = page.locator('select[name^="DOB_Day"]');
    this.dobMonthSelectLocator = page.locator('select[name^="DOB_Month"]');
    this.dobYearSelectLocator = page.locator('select[name^="DOB_Year"]');
    this.genderMaleRadioLocator = page.getByRole('radio', { name: 'Male', exact: true });
    this.genderFemaleRadioLocator = page.getByRole('radio', { name: 'Female', exact: true });
    this.countrySelectLocator = page.locator('#country');
    this.citySelectLocator = page.locator('select[name^="city"]');
    this.securityQuestionSelectLocator = page.locator('select[name^="hintq"]');
    this.securityAnswerInputLocator = page.locator('input[name^="hinta"]');
    this.mothersMaidenNameInputLocator = page.locator('input[name^="mothername"]');
    this.mobileNumberInputLocator = page.locator('#mobno');
    this.createAccountButtonLocator = page.locator('input[name^="Register"]');
    this.checkIfAlternateLocator = page.locator('.nomargin');
    this.homeLinkLocator = page.locator('a:has-text("Rediff Home")').first();
  }
}
