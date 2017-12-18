/*
three types of things
get -> one time search
post -> posting a tweetI
stream -> continious connection to twitter
3 types of streams
user -> event tied to a particular user (ex. me)
public -> anything on twitter (ex. someone tweets with the #, #rainbows)
site ->

//https://developer.twitter.com/en/docs
*/

console.log("running");

var Twit = require('twit');

var config = require('../config');

var T = new Twit(config);


// set up user stream
var stream = T.stream('user');
// anytime
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  //   part for getting json file of tweet
  var fs = require('fs');
  var json = JSON.stringify(eventMsg, null, 2);
  fs.writeFile("tweet.json", json);

  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;
  console.log(replyto + ' ' + from);
  if (reply to === 'ro_bot_testing') {
    var newtweet = '@' + from + 'thank you for tweeting me!'
  }
  tweetIt(newtweet);

};

//  tweet
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
