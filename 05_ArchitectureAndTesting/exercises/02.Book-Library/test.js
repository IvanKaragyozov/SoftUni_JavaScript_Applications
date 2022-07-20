const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

const host = 'http://127.0.0.1:8080';
const mockData = {
    "d95e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d95e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}

describe('Tests', async function () {
    this.timeout(6000);

    let browser, page;

    before(async () => {
        browser = await chromium.launch({headless: false, slowMo: 1000});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () =>{
        page.close();
    });

    it('should work',  async () => {
        await new Promise(r => setTimeout(r, 2000));
        expect(1).to.equal(1);
    });

    it('should load all books', async () => {
        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });
        });
        // navigate to page
        await page.goto(host);

        // find and click Load button
        await page.click('text=Load all books');
        await page.waitForSelector('text=Harry Potter');
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        // check displayed books
        expect(rowData[0]).to.contain('Harry Potter');
        expect(rowData[0]).to.contain('Rowling');
        expect(rowData[1]).to.contain('C# Fundamentals');
        expect(rowData[1]).to.contain('Nakov');
    });

    it('should create book', async () => {
        // navigate to page
        await page.goto(host);
        // find form

        // fill input fields
        await page.fill('input[name=title]', 'Title');
        await page.fill('input[name=author]', 'Author');
        // click Submit
        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() === 'POST'),
            page.click('text=Submit')
        ]);
        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });
});
