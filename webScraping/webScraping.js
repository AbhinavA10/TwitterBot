/* The following are the sources I used to learn about webscraping with Puppeteer

https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/\
https://github.com/GoogleChrome/puppeteer
https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
*/

const puppeteer = require('puppeteer');

// the title of the wikihow page is in the html tag : head->title
let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false // default is true
  });
  const page = await browser.newPage();
  await page.goto('http://www.wikihow.com/Special:Randomizer');
  const result = await page.evaluate(() => {
    let title = document.querySelector('title').innerText;
    return title
  });
  await browser.close();
  return result;
};
scrape().then((value) => {
  console.log(value);
});
