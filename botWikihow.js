//TODO figure out why basic image is needed, and why saving starts at '1'
//TODO add proper naming
//TODO handle promise rejection

// This bot includes replies to users, and posting random wikihow titles

/* The following are the sources I used to learn about webscraping with Puppeteer

https://github.com/GoogleChrome/puppeteer
https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/

Other general Sites
https://developer.twitter.com/en/docs
http://shiffman.net
*/
console.log("Starting up bot");
const puppeteer = require('puppeteer');
const config = require('./config');
const fs = require('fs');
const Twit = require('twit');
var T = new Twit(config);

// set up user stream
var stream = T.stream('user');
var nNumImage = 0;

//-------------------- REPLY TWEET ------------------
stream.on('tweet', tweetEvent);
// anytime I'm involved with a tweet
function tweetEvent(eventMsg) {
  var reply_to = eventMsg.in_reply_to_screen_name; //tweet aimed at..
  var from = eventMsg.user.screen_name; //tweet from
  var txt = eventMsg.text; // text in the streamRetweet
  var id = eventMsg.id_str; // conversation thread
  var language = eventMsg.lang; // conversation thread
  console.log(reply_to + ' ' + from);
  if (reply_to === 'ro_bot_testing' && language === 'en') { //tweets by me show up here too, so filter out
    var replyText = '@' + from + ' '; //reply to sender
    var regexQuestion = /\?/;
    if (regexQuestion.test(txt)) {
      replyText = replyText + 'idk, what do you think...';
    } else {
      replyText = replyText + 'haha true';
    }
    T.post('statuses/update', { //post a reply tweet as a conversation
      status: replyText,
      in_reply_to_status_id: id
    }, tweeted);
  }
};
//-------------------- FOLLOW EVENT ------------------
stream.on('follow', followEvent);
// when someone follows me
function followEvent(eventMsg) {
  console.log("follow event");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + " Why would you follow me?");
};

//--------------------BASIC TWEET------------------
function tweetIt(txt) {
  var tweet = {
    status: txt,
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wrong!");
    } else {
      console.log("it worked!");
    }
  };
};
//---------------------SCRAPING WIKIHOW WEBPAGE FOR TITLE-----------------------
let scrape = async () => {
  const browser = await puppeteer.launch({
    //headless: true // default is true. To see in action, make false
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // comment line out if testing. this line only needed for heroku
  });
  const page = await browser.newPage();
  await page.goto('http://www.wikihow.com/Special:Randomizer');
  const result = await page.evaluate(() => {
    let title = document.querySelector('title').innerText;
    // the title of the wikihow page is in the html tag : head->title
    title = title.replace(/wikiHow/gi, '');
    title = title.replace(/ - /gi, '');
    title = title.replace(/ \(with Pictures\)/gi, ''); //regex rules: \ means escaped character, g means global, i means case insensitive
    title = title.replace(/ Steps/gi, '');
    title = title.replace(/\: [1-9][0-9]/gi, '');
    title = title.replace(/\: [0-9]/gi, '');
    // by splitting up the above regex lines, all types of titles are corrected
    // For example, not all titles necessarily say "(with Pictures)"
    return title
  });
  await browser.close();
  return result;
};
// --------------------------COMBINED TWEET FUNCTION--------------------------
function tweetWikiHow() {
  scrape().then((title) => {
    console.log('Found article called ' + title);
    scrapeImage();
    console.log('Completed Scraped Image');
    tweetPic(title);
    nNumImage++;
    console.log('added to nNumImage');
  });
}
// --------------------------SCRAPE IMAGE-------------------------------------
// the title of the wikihow page is in the html tag : head->title
async function scrapeImage() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    //headless: false // default is true
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
    // or 728 x 546 for some files on Wikihow (of format Webp)
  });
  const wikiImage = await page.$(imgName);
  await wikiImage.screenshot({
    path: 'savedWikiImages/wiki' + nNumImage + '.png',
    omitBackground: true,
  });
  await browser.close();
};
// --------------------------TWEET PICTURE-------------------------------------
function tweetPic(title2) {
  var wikiTitle = title2;
  var filename = 'savedWikiImages/wiki' + nNumImage + '.png';
  var params = {
    encoding: 'base64'
  }
  var b64 = fs.readFileSync(filename, params);
  //need to upload media to twitter first, then tweet
  T.post('media/upload', {
    media_data: b64
  }, uploaded);

  function uploaded(err, data, response) {
    var id = data.media_id_string;
    var tweet = {
      status: wikiTitle,
      media_ids: [id]
    }
    console.log("Upload of image worked");
    T.post('statuses/update', tweet, tweeted);
  }

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went completely wrong!");
    } else {
      console.log("Complete tweet worked!");
    }
  }
};
/// --------------------------RUN-----------------------------------------------
var timeinHours = 0.5;
tweetWikiHow(); // run once, to make sure it works when deployed from heroku
setInterval(tweetWikiHow, 1000 * 60 * 60 * timeinHours); // reduced to 2 hours to save dyno hours
