console.log("running");

var Twit = require('twit');

var config = require('../config');

var T = new Twit(config);


// set up user stream
var stream = T.stream('user');
// anytime someone follows me
stream.on('follow', followed);
//https://developer.twitter.com/en/docs

function followed(eventMsg) {
  console.log("follow event");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@'+screenName+" Thanks for following me!");
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
