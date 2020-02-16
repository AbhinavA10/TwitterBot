# TwitterBot
This is a twitter bot I created, based off of Daniel Shiffman's Node.js and twitterbot tutorials. This app is hosted and run off Heroku.

You can see the current tweets here: [@ro_bot_testing on twitter](https://twitter.com/ro_bot_testing)

You can see the current tweets here: [@LoverWikihow](https://twitter.com/LoverWikihow)

You will need to create your own Twitter account, and supply the credentials in `config.js`. 

## To Install Puppeteer API
Before running this code: use `npm i --save puppeteer` in command line.


## Getting Access Token
- make a twitter account
- login to dev.twitter.com
- go to https://developer.twitter.com/en/apps
- create a new app
- click on keys and access tokens when done
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
Installing the CLI is not necessary to running code off of Heroku. You can also deploy directly from Github.

Heroku gives a free account 550 dyno hours, and puts apps to sleep 30 mins after inactivity. [Source](https://devcenter.heroku.com/articles/free-dyno-hours)
To check free dyno hours left: `heroku ps -a <app name>`

### Implementing Puppeteer in Heroku
Installs dependencies needed in order to run puppeteer on Heroku. This can be done by going to the Settings page of the Heroku app and adding a buildpack, or running 
```
heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack.git
```

Include `{ args: ['--no-sandbox', '--disable-setuid-sandbox'] }` in call to `puppeteer.launch()`

Side Note: for Debugging Puppeteer, in `puppeteer.launch()`, add `{headless: false}` to be able to see what it is doing. ex. opening up GoogleChrome.

----
## Sources
I used the following websites to create this TwitterBot

### Twitter Side
- [Daniel Shiffman's Twitterbot tutorials](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV)
- [Twitter Developer Docs](https://developer.twitter.com/en/docs)
- [Twitter API Client for node](https://github.com/ttezel/twit)

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

To deploy to heroku: 
```
heroku create
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack.git
git push heroku master
```

Creating twitterbot-puppeteer... done
https://twitterbot-puppeteer.herokuapp.com/ | https://git.heroku.com/twitterbot-puppeteer.git


To run the app locally: 
```
heroku local
```
To view logs:
```
heroku logs
```
To shutdown the heroku app:
```
heroku ps:scale web=0
```



TODO: update puppeteer version