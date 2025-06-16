import { RediffLocators } from '../locators/rediffLocators';

export class RediffPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToRediff() {
        await this.page.goto('https://www.rediff.com/');
    }

    async clickCreateAccount() {
        await this.page.click(RediffLocators.CREATE_ACCOUNT_LINK);
    }

    async validateCreateAccountPage() {
        await this.page.waitForSelector(RediffLocators.CREATE_ACCOUNT_HEADER);
        return await this.page.isVisible(RediffLocators.CREATE_ACCOUNT_HEADER);
    }

    async getAllLinksWithText() {
        const links = await this.page.$$(RediffLocators.ALL_LINKS);
        console.log(`Total number of links: ${links.length}`);
        
        const linksData = [];
        for (const link of links) {
            const href = await link.getAttribute('href');
            const text = (await link.textContent())?.trim() || 'Home';
            linksData.push({ href, text });
            console.log(`Link: href = " ${href} ", text = " ${text} "`);
        }
        return linksData;
    }

    async clickTermsAndConditions() {
        const [newWindow] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click(RediffLocators.TERMS_CONDITIONS_LINK)
        ]);
        return newWindow;
    }

    async getPageTitle() {
        return await this.page.title();
    }
}
