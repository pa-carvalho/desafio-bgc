const puppeteer = require('puppeteer');

module.exports.handler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1520,
            height: 1140,
        });
        await page.goto('https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers');

        // await page.waitForNavigation();

        const categoriesHandles = await page.$$('div.a-row.a-carousel-header-row.a-size-large'); // div > div > div > div.a-row.a-carousel-header-row.a-size-large

        let categories = [];

        for (const categoryhandle of categoriesHandles) {

            let category = "Null"

            try{
                category = await page.evaluate(el => el.querySelector('.a-carousel-heading').textContent, categoryhandle)
            } catch (error) {}

            if (category !== "Null") {
                categories.push(category);
            }
        }

        const productsHandles = await page.$$('.a-carousel-card');

        let items = [];

        for (const producthandle of productsHandles) {

            let title = "Null"

            try {
                title = await page.evaluate(el => el.querySelector("span > div").textContent, producthandle)
            } catch (error) { }

            if (title !== "Null") {
                items.push(title);
            }
        }

        const divideArray = (arr, groupSizes, skipCount) => {
            const result = [];
            let currentIndex = 0;

            for (const groupSize of groupSizes) {
                const currentGroup = [];
                for (let i = 0; i < groupSize; i++) {
                    if (currentIndex < arr.length) {
                        currentGroup.push(arr[currentIndex]);
                        currentIndex++;
                    }
                }
                result.push(currentGroup);
                currentIndex += skipCount; // Pula os valores após formar um grupo
            }

            return result;
        };

        // Dividindo os 12 primeiros valores em grupos de 3, pulando 1 valor entre os grupos
        const firstGroups = divideArray(items.slice(0, 12), [3, 3, 3], 1);

        // Dividindo os 18 valores restantes em grupos de 3, pulando 3 valores entre os grupos
        const remainingGroups = divideArray(items.slice(12), [3, 3, 3, 3, 3, 3], 3);

        // Juntando os resultados
        const finalResult = [...firstGroups, ...remainingGroups.filter(group => group.length > 0)];

        const groupedCategories = categories.slice(0, finalResult.length).map((category, index) => ({
            category,
            items: finalResult[index],
        }));
        
        console.log(groupedCategories);

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