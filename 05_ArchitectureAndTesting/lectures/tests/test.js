const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

const options = {headless: false, slowMo: 200};
const url = 'http://127.0.0.1:8080';

describe('custom test', function () {
    let browser, page;

    this.timeout(10000);
    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    this.afterEach(async () => await page.close());
    this.afterAll(async () => await browser.close());

    it('Successful login', async function () {
        await page.goto(url);

        await page.click('text=Login');
        await page.fill('input[name=email]', 'peter@abv.bg');
        await page.fill('input[name=password]', '123456');
        await page.click('input[value=Login]');

        let buttonText = await page.textContent('#logout-btn');

        expect(buttonText).to.equal('Logout');
    });
});