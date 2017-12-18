# TwitterBot
This is a twitter bot I created, based off of Daniel Shiffman's Node.js and twitterbot tutorials. This app is hosted and run off heroku.

You can see the current tweets here: https://twitter.com/ro_bot_testing

## To Install Puppeteer API
Use `npm i --save puppeteer` in command line.

## Sources
I used the following websites to create this TwitterBot

### Twitter Side
- Twitter Side[Daniel Shiffman's Website and Tutorials] (http://shiffman.net)
- [Twitter Developer Docs] (https://developer.twitter.com/en/docs)

### Webscraping
- [The Puppeteer API] (https://github.com/GoogleChrome/puppeteer)
- [Emad Eshan's Getting Started with Puppeteer for Webscraping] (https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-wb-scrapping-6bf5979dee3e)
- [Yogendra Rampuria's Puppeteer Webscraping Presentation] (https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/)

## Twit API Notes

There are three types of events in Twitter / Twit API
1. get -> one time search
2. post -> posting a tweet
3. stream -> continuous connection to twitter
   - user -> event tied to a particular user (ex. me)
   - public -> anything on twitter (ex. someone tweets with the #, #rainbows)
   - site -> ??
