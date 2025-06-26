import { CompanyPageLocators } from '../locators/CompanyPageLocators.js';
export class CompanyPage {
  constructor(page) {
        this.page = page;
        // Locators
        this.locators = new CompanyPageLocators(page);
       
    }

    /**
     * Scroll to Financial Results section
     */
    async scrollToFinancialResults() {
        await this.locators.financialResultsLocator.waitFor();
        await this.locators.financialResultsLocator.scrollIntoViewIfNeeded();
    }

    /**
     * Extract data from the Financial Results table
     * @returns {Promise<Array<Array<string>>>} Table data as a 2D array
     */
    async extractFinancialData() {
        await this.locators.financialResultsTableLocator.waitFor();
        
        const tableData = [];
        const rows = await this.locators.financialResultsTableLocator.locator('tr').all();
        
        for (const row of rows) {
            const cells = await row.locator('td, th').all();
            const rowData = [];
            
            for (const cell of cells) {
                const text = await cell.textContent();
                rowData.push(text.trim());
            }
            
            if (rowData.length > 0) {
                tableData.push(rowData);
            }
        }
        
        return tableData;
    }
}
