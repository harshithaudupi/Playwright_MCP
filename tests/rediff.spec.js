import { test, expect } from '@playwright/test';
import {RediffPage} from '../pages/rediffPage'; // Correct import for export default
import fs from 'fs';

test.describe('Rediff Create Account Tests', () => {
    test('should handle multiple windows and count links', async ({ page }) => {
        // Ensure RediffPage is instantiated correctly
        let rediffPage = new RediffPage(page);

        
        // Launch browser and navigate to Rediff
        await rediffPage.navigateToRediff();

        // Click on Create Account link
        await rediffPage.clickCreateAccount();

        // Validate Create Account page is opened
        const isCreateAccountPage = await rediffPage.validateCreateAccountPage();
        expect(isCreateAccountPage).toBeTruthy();

        // Get all links count and print them
        // const linksCount = await rediffPage.getAllLinksWithText();
        const links = await rediffPage.getAllLinksWithText();
        const linksData = links.map(link => ({
            href: link.href,
            text: link.text || 'Home'
        }));

        // Save links to a JSON file
        const outputPath = '../outputs/links.json';
        fs.writeFileSync(outputPath, JSON.stringify(linksData, null, 2));
        console.log(`Links saved to ${outputPath}`);

        // Validate links count
        expect(links.length).toBeGreaterThan(0);

        // Click on terms and conditions link and handle new window
        let newWindow;
        try {
            newWindow = await rediffPage.clickTermsAndConditions();
            if (!newWindow) {
                throw new Error('New window did not open as expected.');
            }
            // Switch to new window and validate title
            const expectedTitle = 'Terms and Conditions';
            const actualTitle = await newWindow.title();
            expect(actualTitle).toContain(expectedTitle);

            // Close the child window
            await newWindow.close();
        } catch (error) {
            console.error('Failed to open or interact with the new window:', error);
        }

        // Verify we're back on the main window
        const mainTitle = await rediffPage.getPageTitle();
        expect(mainTitle).toContain('Rediffmail');
    });
});

test.afterEach(async ({ page }) => {
    await page.close();
});
