//TODO remove (with pictures) - wikihow from scraped title

// This bot includes replies to users, and posting random wikihow titles

/* The following are the sources I used to learn about webscraping with Puppeteer
https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/\
https://github.com/GoogleChrome/puppeteer
https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
*/

/*
There are three types of events in Twitter / Twit API
get -> one time search
post -> posting a tweetI
stream -> continious connection to twitter
  3 types of streams
    user -> event tied to a particular user (ex. me)
    public -> anything on twitter (ex. someone tweets with the #, #rainbows)
    site -> ??

https://developer.twitter.com/en/docs
http://shiffman.net
*/
console.log("running");
const Twit = require('twit');
const puppeteer = require('puppeteer');
var config = require('./config');
var T = new Twit(config);

// set up user stream
var stream = T.stream('user');

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
//---------------------SCRAPING WIKIHOW WEBPAGE FOR TITLE-------
let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false // default is true
  });
  const page = await browser.newPage();
  await page.goto('http://www.wikihow.com/Special:Randomizer');
  const result = await page.evaluate(() => {
    let title = document.querySelector('title').innerText;
    // the title of the wikihow page is in the html tag : head->title
    return title
  });
  await browser.close();
  return result;
};

function tweetTitle() {
  scrape().then((title) => {
    tweetIt(title)
    console.log(title);
  });
}
/// --------------------------RUN-----
tweetTitle();
setInterval(tweetTitle, 1000 * 60 * 60); // 1 hour