const puppeteer = require('puppeteer');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
// import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });

// Função para juntar as categorias com os produtos
const combineArrays = (arrayA, arrayB) => {
    const arrayC = [];

    for (let i = 0; i < arrayA.length; i++) {
        const category = arrayA[i];
        const items = arrayB.slice(i * 3, (i + 1) * 3);

        const combinedObject = {
            category,
            items,
        };

        arrayC.push(combinedObject);
    }

    return arrayC;
};

// Função para extrair produtos e ranks da página
const extractProducts = async (page) => {

    let products = [];
    let categories = [];

    const categoriesHandles = await page.$$('div.a-row.a-carousel-header-row.a-size-large');

    for (const categoryhandle of categoriesHandles) {
        let category = "Null";

        try {
            category = await page.evaluate(el => el.querySelector('.a-carousel-heading').textContent, categoryhandle);
        } catch (error) { }

        if (category !== "Null") {
            categories.push(category);
        }
    }

    const productsHandles = await page.$$('.a-carousel-card');

    for (const producthandle of productsHandles) {
        let title = "Null";
        let rank = "Null";
        let image = "Null";
        let avaliation = "Null";
        let price = "Null";

        try {
            title = await page.evaluate(el => el.querySelector("span > div").textContent, producthandle);
        } catch (error) { }

        try {
            rank = await page.evaluate(el => el.querySelector("div > div.a-section.zg-bdg-ctr > div.a-section.zg-bdg-body.zg-bdg-clr-body.aok-float-left > span").textContent, producthandle);
        } catch (error) { }

        try {
            image = await page.evaluate(el => el.querySelector("div > img").getAttribute("src"), producthandle)
        } catch (error) { }

        try {
            avaliation = await page.evaluate(el => el.querySelector("div > a > i > span").textContent, producthandle)
        } catch (error) { }

        try {
            price = await page.evaluate(el => el.querySelector("div > div > a > div > span > span").textContent, producthandle)
        } catch (error) { }

        if (title !== "Null" && rank !== "Null" && (rank === "#1" || rank === "#2" || rank === "#3")) {
            let product = rank + ": " + title;
            products.push({ product, image, avaliation, price });
        }
    }

    const groupedByCategory = combineArrays(categories, products);

    return groupedByCategory;
};

/*
// Função para inserir dados no DynamoDB
const insertDataIntoDynamoDB = async (groupedCategories) => {
    await Promise.all(groupedCategories.map(async (group) => {
        const params = {
            TableName: 'amazon-products',
            Item: marshall({
                category: group.category,
                items: group.items,
            }),
        };

        const putCommand = new PutItemCommand(params);
        await dynamoDBClient.send(putCommand);
    }));
};
*/
module.exports.handler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            userDataDir: "./tmp",
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1520,
            height: 1140,
        });
        await page.goto('https://www.amazon.com.br/gp/bestsellers/?ref_=nav_cs_bestsellers');

        const test = await extractProducts(page);

        // console.log(test);
        // await insertDataIntoDynamoDB(groupedCategories);

        // await browser.close();

        console.log(JSON.stringify(test, null, 2));

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
