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
var config = require('./config');
var T = new Twit(config);

// set up user stream
var stream = T.stream('user');
stream.on('tweet', tweetEvent);
// anytime I get tweeted @
function tweetEvent(eventMsg) {
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;
  console.log(replyto + ' ' + from);
  if (replyto === 'ro_bot_testing') {
    var newtweet = '@' + from + 'thank you for tweeting me!';
    tweetIt(newtweet);
  }

};

stream.on('follow', followEvent);
// when someone follows me
function followEvent(eventMsg) {
  console.log("follow event");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + " Thanks for following me! I'm gaining fame.");
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
setInterval(tweetRand, 1000 * 60 * 60); // 1 hour

//  tweet 'hello world!'
function tweetRand() {
  var r = Math.floor(Math.random() * 100);
  tweetIt(r);
};
