# Playwright MCP Server 🎭

A Model Context Protocol server that provides browser automation capabilities using Playwright. This server enables LLMs to interact with web pages, take screenshots, generate test code, web scraps the page and execute JavaScript in a real browser environment.


### Features of Playwright MCP Server
- **Browser Automation**: Automates browser actions using Playwright.
- **Context Management**: Defines and manages contexts for locators, pages, and tests.
- **Scalability**: Enables easy scaling of test frameworks.


## Overview
This project is built using Playwright for end-to-end testing of web applications. It includes tests for handling multiple windows, validating page elements, and saving data in JSON format. The project is structured to ensure modularity and scalability, with separate files for locators, pages, fixtures, and tests.

## Features
- **Page Object Model Implementation**: Organized test framework using POM pattern for better maintainability
- **Multiple Window Handling**: Tests include switching between different pages and handling new windows
- **Data-Driven Testing**: Uses JSON input files for account creation with multiple test data
- **Dynamic Navigation**: Robust navigation through different sections of Rediff website
- **Data Extraction**: Extracts financial and forex data and saves in Excel/JSON formats
- **Exception Handling**: Robust error handling with proper page load waiting and element states
- **Allure Reporting**: Integration with Allure for detailed test reports and screenshots

## Project Structure
```
├── POM (Page Object Model)
│   ├── HomePage.js
│   ├── CreateAccountPage.js
│   ├── MoneyPage.js
│   ├── InsurancePage.js
│   ├── CompanyPage.js
│   └── ForexPage.js
├── inputs
│   └── createAccountInputs.json
├── outputs
│   ├── global_health_financial_results.xlsx
│   └── ForexResult.json
├── prompts
│   └── implementation_steps.md
├── tests
│   └── rediff.spec.js
├── tests-examples
├── allure-report
├── allure-results
├── playwright.config.js
└── README.md
```


## Running Tests
1. Run all tests:
   ```bash
   npx playwright test
   ```
2. Run a specific test:
   ```bash
   npx playwright test tests/rediff.spec.js
   ```

## Generating Reports
- HTML Report:
  ```bash
  npx playwright show-report
  ```

## Key Files
- **playwright.config.js**: Configuration file for Playwright.
- **tests/rediff.spec.js**: Contains tests for the Rediff application.
- **pages/rediffPage.js**: Page object model for the Rediff application.
- **outputs/links.json**: Stores extracted links in JSON format.

## Test Cases

1. **Create Account Page Validation**
   - Validates page title and extracts all links
   - Tests for terms and conditions, privacy policy links

2. **Terms and Privacy Links Validation**
   - Verifies navigation to terms and privacy pages
   - Validates content in new windows

3. **Multiple Window Handling**
   - Tests switching between parent and child windows
   - Validates correct window context after navigation

4. **Data-Driven Account Creation**
   - Reads test data from createAccountInputs.json
   - Creates multiple accounts with different data
   - Handles security questions dynamically

5. **Insurance Page Financial Data**
   - Navigates through Money and Insurance pages
   - Searches for Global Health Ltd.
   - Extracts financial results to Excel file

6. **SignIn Validation**
   - Navigates to SignIn Page
   - Enters username and password
   - does not submit form 

## Page Objects

1. **HomePage**: Main page navigation and common elements
2. **CreateAccountPage**: Account creation form and validation
3. **MoneyPage**: Money section navigation and elements
4. **InsurancePage**: Insurance section and company search
5. **CompanyPage**: Company financial data extraction
6. **ForexPage**: Currency conversion functionality




# Screenshots

#### Instructions
![alt text](mcp1.png)

![alt text](mcp.png)












