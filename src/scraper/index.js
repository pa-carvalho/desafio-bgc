const puppeteer = require('puppeteer');

module.exports.handler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
        await page.goto('https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers');
    
        // await page.waitForNavigation();
    
        // const productsHandles = await page.$$('div#anonCarousel1');
        const productsHandles = await page.$$('.a-carousel >>> .p13n-sc-truncate-desktop-type2');
        await page.screenshot({
            path: 'screenshot.jpg'
          });
        console.log(productsHandles);
        for(const producthandle of productsHandles){
            const title = await page.evaluate(el => el.querySelector("span > div").textContent, producthandle)
            
    
            console.log(title)
        }
        // await browser.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Scraping completed successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing the request' }),
        };
    }
};