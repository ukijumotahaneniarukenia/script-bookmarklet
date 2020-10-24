const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    await page.goto('https://addyosmani.com/blog/puppeteer-recipes/#devtools-profile');

    const scrapingData = await page.evaluate(() => {
        let documentText = document.querySelector('html').outerHTML
        return documentText;
    });

    console.log(scrapingData)

    await page.waitFor(1000); // ミリ秒

    browser.close();

})();

