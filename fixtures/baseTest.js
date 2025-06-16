const base = require('@playwright/test');
import { allure } from  'allure-playwright';

exports.test = base.test.extend({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await use(page);
    },
    allure: async ({}, use) => {
        await use(allure);
    }
});

exports.expect = base.expect;
