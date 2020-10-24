/*
three types of things
get -> one time search
post -> posting a tweetI
stream -> continuous connection to twitter
3 types of streams
user -> event tied to a particular user (ex. me)
public -> anything on twitter (ex. someone tweets with the #, #rainbows)
site -> ??

//https://developer.twitter.com/en/docs
http://shiffman.net
*/

console.log("running");
var Twit = require('twit');
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
      replyText = replyText + 'IDK, what do you think?';
    } else {
      replyText = replyText + 'Haha, true!';
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
  tweetIt('@' + screenName + " Thanks for following me!");
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

//-------------------- RETWEET ------------------
// An empty array for a queue of tweets
var queue = [];

// Search the stream for a kind of tweet
var phrase = "meme";
var regex = /meme/;
//setup status stream
var streamRetweet = T.stream('statuses/filter', {
  track: phrase
})
streamRetweet.on('tweet', gotTweet);

function gotTweet(tweet) {
  // Twitter docs states "Exact matching of phrases is not supported."
  if (regex.test(tweet.text)) {
    console.log('Adding to queue ' + tweet.id_str);
    //TODO: filter content of safe retweets. 
    // Save this tweet for the queue
    queue.push(tweet.id_str);
  }
}

// Every hour, pick a random matched tweet from queue and retweet
setInterval(retweetPhrase, 60 * 60 * 1000);

function retweetPhrase() {
  console.log('I have ' + queue.length + ' tweets in the queue.');
  // Make sure there is something in queue
  if (queue.length > 0) {
    var index = Math.floor(Math.random() * queue.length);
    var tweetID = queue[index];
    console.log('attempting to retweet: ' + tweetID);
    queue = []; // clear queue to start over

    T.post('statuses/retweet', {
      id: tweetID
    }, retweeted);

    function retweeted(err, data, response) {
      if (err) {
        console.log("Error: " + err.message);
      } else {
        console.log('Retweeted: ' + tweetID);
      }
    }

  } else {
    console.log('No tweets to retweet.');
  }
}
