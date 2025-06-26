// CompanyPageLocators.js
export class CompanyPageLocators{
    constructor(page) {
        this.financialResultsLocator = page.locator('text="Financial Results of Global Health Ltd."');
        this.financialResultsTableLocator = page.locator('table.dataTable');
    }
};
