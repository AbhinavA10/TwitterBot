# TwitterBot
This is a twitter bot I created, based off of Daniel Shiffman's Node.js and twitterbot tutorials. This app is hosted and run off Heroku.

You can see the current tweets here: https://twitter.com/ro_bot_testing

## To Install Puppeteer API
Before running this code: use `npm i --save puppeteer` in command line.

----
## Twit API Notes

There are three types of events in Twitter / Twit API
1. get -> one time search
2. post -> posting a tweet
3. stream -> continuous connection to twitter
   - user -> event tied to a particular user (ex. me)
   - public -> anything on twitter (ex. someone tweets with the #, #rainbows)
   - site -> ??

----
## Heroku Notes
Installing the CLI is not necessary to running code off of Heroku. You can also deploy directly from Github, which is what I did.

Heroku gives a free account 550 dyno hours, and puts apps to sleep 30 mins after inactivity. [Source](https://devcenter.heroku.com/articles/free-dyno-hours)
To check free dyno hours left: `heroku ps -a <app name>`

### Implementing Puppeteer in Heroku
Installs dependencies needed in order to run puppeteer on Heroku. This can be done by going to the Settings page of the Heroku app and adding a buildpack, or running `heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack.git`

Be sure to include `{ args: ['--no-sandbox', '--disable-setuid-sandbox'] }` in your call to `puppeteer.launch()`

Side Note: for Debugging Puppeteer, in `puppeteer.launch()`, add `{headless: false}` to be able to see what it is doing. ex. opening up GoogleChrome.
----
## Sources
I used the following websites to create this TwitterBot

### Twitter Side
- [Daniel Shiffman's Website and Tutorials](http://shiffman.net)
- [Twitter Developer Docs](https://developer.twitter.com/en/docs)

### Webscraping with Puppeteer
- [The Puppeteer API](https://github.com/GoogleChrome/puppeteer)
- [Emad Eshan's Getting Started with Puppeteer for Webscraping](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-wb-scrapping-6bf5979dee3e)
- [Yogendra Rampuria's Puppeteer Webscraping Presentation](https://yogendra.me/2017/10/28/puppeteer-no-strings-attached/)

### Heroku

- [Heroku: Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- [Heroku: Buildpacks](https://devcenter.heroku.com/articles/buildpacks)
- [Cheatsheet for Heroku](https://devhints.io/heroku)
- [Running Headless Chrom on Heroku](https://timleland.com/headless-chrome-on-heroku/)
- [Puppeteer-heroku-buildpack on Github](https://github.com/jontewks/puppeteer-heroku-buildpack)
- [Deploying Puppeteer on Heroku](https://github.com/GoogleChrome/puppeteer/issues/758)
