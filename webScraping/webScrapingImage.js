/* The following are the sources I used to learn about webscraping with Puppeteer

https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/\
https://github.com/GoogleChrome/puppeteer
https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
*/
var num = 0;
const puppeteer = require('puppeteer');
scrape();
// the title of the wikihow page is in the html tag : head->title
async function scrape() {

  const browser = await puppeteer.launch({
    headless: false // default is true
  });
  const page = await browser.newPage();

  // Navigate to this blog post and wait a bit.
  await page.goto('http://www.wikihow.com/Special:Randomizer');
  const imgName = '#steps_1 > ol > li:nth-child(1) > div.mwimg.largeimage.floatcenter > a > div > img';
  await page.waitForSelector(imgName);
  // Select the first image element and save the screenshot.
  page.setViewport({
    width: 900, // dimensions of the first wikihow image on every(?) page
    height: 675
    // or 728 x 546 for some files on Wikihow (of fromat Webp)
  });
  const wikiImage = await page.$(imgName);
  //await page.click(imgName);
  //await page.waitFor(2 * 1000);
  num++;
  await wikiImage.screenshot({
    path: 'downloadedPics/wikiMe' + num + '.png',
    omitBackground: true,
  });
  await browser.close();

};
