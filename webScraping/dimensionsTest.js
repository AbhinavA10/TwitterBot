// an updated attempt at dimensions.js

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false // default is true
  });
  const page = await browser.newPage();
  await page.goto('https://www.wikihow.com/Resist-Naughty-Food-Cravings');

  console.log("line 10");
  const imgSource = await page.evaluate(() => {
    return {
      images: document.images
    };
  });
  console.log('IMG URL:', imgSource[5].src);
  var imgWiki = window.document.getElementsByTagName("img");
  console.log("line 13");
  console.log(imgWiki[0].src);
  await page.goto(imgWiki[0].src);
  console.log("line 15");
  const imgName = '#steps_1 > ol > li:nth-child(1) > div.mwimg.largeimage.floatcenter > a > div > img';
  await page.waitForSelector(imgName);
  // Select the first image element and save the screenshot.
  const wikiImage = await page.$(imgName);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.imgName.width,
      height: document.imgName.height,
      //document.getElementById("myImg").src = "hackanm.gif";
      //document.getElementById("myImg").width = "hackanm.gif";
      deviceScaleFactor: window.devicePixelRatio
    };
  });


  console.log('Dimensions:', dimensions);

  await browser.close();
})();
