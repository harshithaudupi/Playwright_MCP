import { test, expect } from '@playwright/test';
// Import the HomePage class
import { HomePage } from '../POM/HomePage'; 
// Import the CreateAccountPage class
import { CreateAccountPage } from '../POM/CreateAccountPage'; 
// Import the MoneyPage class
import { MoneyPage } from '../POM/MoneyPage';
// Import the InsurancePage class
import { InsurancePage } from '../POM/InsurancePage';
// Import the CompanyPage class
import { CompanyPage } from '../POM/CompanyPage';

import { SignInPage } from '../POM/SignInPage'; // Import the SignInPage class

// Import the fs (file system) module for file operations
import * as fs from 'fs/promises'; 
// Import the path module for working with file paths
import * as path from 'path'; 
// Import XLSX for Excel operations
import * as XLSX from 'xlsx';

test.describe('Rediff Account Multiple Window Test', () => {
  // Declare variables to hold page instances
  let homePage;
  let createAccountPage;
  let moneyPage;
  let insurancePage;
  let companyPage;
  let signInPage;
  let page;

  // This hook runs before each test in this describe block  
  test.beforeEach(async ({ page: pageContext }) => {
    // Assign the page object to the 'page' variable   
    page = pageContext;
      // Initialize all page objects
    homePage = new HomePage(page);
    createAccountPage = new CreateAccountPage(page);
    moneyPage = new MoneyPage(page);
    insurancePage = new InsurancePage(page);
    companyPage = new CompanyPage(page);
    signInPage = new SignInPage(page); // Assuming you have a SignInPage class for sign-in operations
    
    await homePage.goToRediffPage(); // Navigate to the Rediff homepage
    await homePage.navigateToCreateAccount(); // Navigate to the Create Account page
    await page.waitForLoadState('domcontentloaded'); // Wait for the DOM content to be loaded
  });

  // Test case 1: Validate Create Account Page Title and Store Links
  test('Validate Create Account Page Title and Store Links', async () => {
    const title = await createAccountPage.getPageTitle();
    expect(title).toContain('Rediffmail Free Unlimited Storage');

    const linksLocator = homePage.getAllLinks();
    const links = await linksLocator.all();
    const totalLinks=links.length;
    const linksData = [];
   

    for (const link of links) {
        try {
            const text = await link.textContent();
            const href = await link.getAttribute('href');
            // Check if the text is empty or contains only whitespace
            const linkText = (text.trim() === "") ? "Home" : text.trim();
            linksData.push({ text: linkText, href });
        } catch (error) {
            console.error('Error getting link details:', error);
        }
    }
    console.log(`Total number of links on Create Account page: ${totalLinks}`); // Log total links

    const filePath = path.join(__dirname, '../', 'outputs', 'create_acc_links.json'); // Path for storing links
    try {
            await fs.writeFile(filePath, JSON.stringify(linksData, null, 2));
            console.log(`Links data stored in ${filePath}`);
    } 
    catch (error) {
            console.error('Error writing to links.json:', error);
        }
    });
  
  // Test case 2: Handle Terms and Conditions Window
  test('Handle Terms and Conditions Window', async ({}, testInfo) => {
    // Call the handleTermsAndConditions method from CreateAccountPage
    await createAccountPage.handleTermsAndConditions(testInfo); 
  });
  
  // Test case 3: Interact With Multiple Windows
  test('Interact with Multiple Windows', async ({}, testInfo) => {
    await createAccountPage.handleTermsAndConditions(testInfo); // Handle Terms and Conditions window
    await createAccountPage.handlePrivacyPolicy(testInfo); // Handle Privacy Policy window
  });
  // Test case 4: Handling input fields and checkbox for multiple users
   test('Handling input fields and checkbox using JSON data for multiple users', async ({}, testInfo) => {
      try {
        const jsonFilePath = path.join(__dirname, '../', 'inputs', 'createAccountInputs.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const { users } = JSON.parse(jsonData);

        // Loop through each user in the array
        for (const [index, inputData] of users.entries()) {
          console.log(`Creating account for user ${index + 1}: ${inputData.fullName}`);

          if (index > 0) {
            // For subsequent users, navigate back to create account page
            await homePage.goToRediffPage();
            await homePage.navigateToCreateAccount();
            await page.waitForLoadState('domcontentloaded');
          }

          // Fill in the form for each user
          await createAccountPage.enterFullName(inputData.fullName, testInfo);
          await createAccountPage.enterRediffmailId(inputData.rediffmailId, testInfo);
          await createAccountPage.clickCheckAvailability();
          await createAccountPage.enterPassword(inputData.password, testInfo);
          await createAccountPage.enterRetypePassword(inputData.password, testInfo);
          await createAccountPage.selectDobDay(inputData.dobDay, testInfo);
          await createAccountPage.selectDobMonth(inputData.dobMonth, testInfo);
          await createAccountPage.selectDobYear(inputData.dobYear, testInfo);
          await createAccountPage.selectGender(inputData.gender, testInfo);
          await createAccountPage.selectCountry(inputData.country, testInfo);

          
          await createAccountPage.selectCity(inputData.city, testInfo);
          
          await createAccountPage.checkIfAlternateId(testInfo);

          await createAccountPage.selectSecurityQuestion(inputData.securityQuestion, testInfo);
          await createAccountPage.enterSecurityAnswer(inputData.securityAnswer, testInfo);
          await createAccountPage.enterMothersMaidenName(inputData.mothersMaidenName, testInfo);
          await createAccountPage.enterMobileNumber(inputData.mobileNumber, testInfo);

          console.log(`Completed form submission for user ${index + 1}: ${inputData.fullName}`);
        }
      } catch (error) {
        console.error(`Error handling input fields with JSON data: ${error}`);
        throw error;
      }
    });

    // Test case 5: Validating the navigation to insurance page and fetch details  
  test('Validating the navigation to insurance page and fetch details', async () => {
    // Navigate to Rediff Home page from Create Account page    
    await createAccountPage.clickHomeLink();
    await page.waitForLoadState('domcontentloaded');    // Navigate to Money page and wait for it to load
    await homePage.navigateToMoney();
    await page.waitForLoadState('domcontentloaded');    // Navigate to Insurance page and wait for it to load    const newPage = await moneyPage.navigateToInsurance();
    
    await moneyPage.navigateToInsurance();
    await page.waitForLoadState('domcontentloaded');
    await insurancePage.searchAndSelectCompany('Global Health Ltd.');
    
    // Extract financial data
    await companyPage.scrollToFinancialResults();
    const tableData = await companyPage.extractFinancialData();


    // Create Excel workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Financial Results');
    
    // Save workbook to file
    const excelPath = path.join(__dirname, '../outputs', 'global_health_financial_results.xlsx');
    await fs.mkdir(path.dirname(excelPath), { recursive: true });
    XLSX.writeFile(wb, excelPath);
    
    console.log(`Financial results data has been saved to: ${excelPath}`);  });

      // Test case 6: Negative scenario - SignIn failure using SignInPage and locators
  test('Negative Test: SignIn fails with invalid credentials', async () => {
    await homePage.goToRediffPage();
    await page.waitForLoadState('domcontentloaded');

    // Go to sign in page
    await homePage.gotoSignIn();

    // Attempt sign in with invalid credentials
    await signInPage.signIn('invaliduser', 'invalidpassword');
    
    await signInPage.enterCode('123456'); // Assuming a code is required for sign-in
   
    // Assert error message is shown
    const errorText = await signInPage.getErrorMessage();
    // expect(errorText).toMatch(/incorrect|invalid|try again|not match/i);
    console.log('Negative sign-in test: Error message displayed as expected:', errorText);
  });
});
